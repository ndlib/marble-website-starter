module.exports = async (client, searchIndex, nodes) => {
  console.log('Sending data to ElasticSearch')

  // convert the data to bulk index format
  const body = []
  nodes.forEach((node) => {
    body.push({ index:  { _index: searchIndex, _type: '_doc', _id: node.id } })
    body.push(node)
  })
  const bulkResponses = await processChunk(client, chunkResults(1000, body))
  const erroredDocuments = []
  bulkResponses.forEach((bulkResponse) => {
    if (bulkResponse.errors) {
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1],
          })
        }
      })
    }
  })

  if (erroredDocuments.length) {
    console.error('error documents', erroredDocuments)
  }

  console.log('Finished Index')
}

const chunkResults = (chunkSize, arr) => {
  if (chunkSize % 2) {
    // this has to do with the what happens in index where we immediately double
    // the number of items and i am not going to handle it.
    throw new Error('chunck size cannot be odd')
  }
  const R = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    R.push(arr.slice(i, i + chunkSize))
  }
  return R
}

const processChunk = async (client, chunks, index = 0) => {
  let responses = []
  const chunk = chunks[index]
  const result = await client.bulk({ timeout: '30m', refresh: true, body: chunk })
  responses.push(result)
  if (index < chunks.length - 1) {
    const next = await processChunk(client, chunks, index + 1)
    responses = responses.concat(next)
  }
  return responses
}
