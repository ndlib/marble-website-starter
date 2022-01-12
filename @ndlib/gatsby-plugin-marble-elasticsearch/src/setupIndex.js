module.exports = async (client, pluginOptions) => {
  const { searchIndex, settings, mappings } = pluginOptions

  console.log('Attempting to delete existing index.')
  const response = await client.indices.delete({ index: searchIndex }).catch(
    (e) => {
      console.log('Could not delete index or there is no index to delete.')
      console.log(e)
    },
  )
  console.log(response)

  const node = {}
  node.settings = await settings(client)
  node.mappings = await mappings()
  const index = {
    index: searchIndex,
    body: node,
  }

  console.log('Creating index:  ' + searchIndex)
  await client.indices.create(index).catch((e) => {
    console.log(e)
  })
}
