module.exports = async (client, siteIndex, searchData) => {
  console.log('Sending data to ElasticSearch')

  // convert the data to bulk index format
  const body = []
  searchData.forEach((node) => {
    body.push({ index:  { _index: siteIndex, _type: '_doc', _id: node.searchData.id } })
    body.push(node.searchData)
  })

  const bulkResponse = await client.bulk({ refresh: true, body })
  if (bulkResponse.errors) {
    const erroredDocuments = []
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
    console.error('error documents', erroredDocuments)
  }

  console.log('Finished Index')
}
