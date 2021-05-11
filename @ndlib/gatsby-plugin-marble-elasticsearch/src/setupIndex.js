module.exports = async (client, pluginOptions) => {
  const { searchIndex, settings, mappings } = pluginOptions
  const indexExists = await client.indices.exists({ index: searchIndex })
  if (indexExists) {
    console.log('Deleting existing index: ' + searchIndex)
    await client.indices.delete({ index: searchIndex })
  }

  const node = {}
  node.settings = await settings(client)
  node.mappings = await mappings()
  const index = { index: searchIndex, body: node }

  console.log('Creating index:  ' + searchIndex)
  await client.indices.create(index).catch((e) => {
    console.log(e)
  })
}
