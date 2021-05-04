const configIndexSettings = require('./configIndexSettings')
const configIndexMappings = require('./configIndexMappings')

module.exports = async (client, siteIndex) => {
  const indexExists = await client.indices.exists({ index: siteIndex })
  if (indexExists) {
    console.log('Deleting existing index: ' + siteIndex)
    await client.indices.delete({ index: siteIndex })
  }

  const node = {}
  node.settings = await configIndexSettings(client)
  node.mappings = await configIndexMappings()
  const index = { index: siteIndex, body: node }

  console.log('Creating index:  ' + siteIndex)
  await client.indices.create(index).catch((e) => {
    console.log(e)
  })
}
