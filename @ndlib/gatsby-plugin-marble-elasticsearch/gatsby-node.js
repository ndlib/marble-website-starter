const { Client } = require('@opensearch-project/opensearch')
const setupIndex = require('./src/setupIndex')
const indexToElasticSearch = require('./src/indexToElasticSearch')

// eslint-disable-next-line complexity
exports.onPostBuild = async (
  gatsbyInternal,
  pluginOptions,
) => {
  if (process.env.GITHUB_ACTIONS) {
    return
  }
  const { graphql } = gatsbyInternal
  const {
    url,
    searchIndex,
    region,
    query,
    selector,
    mappings,
    settings,
  } = pluginOptions

  if (!url || !searchIndex || !region || !query || !selector || !mappings || !settings) {
    console.error('Missing required parameter for marble-elasticsearch plugin')
    return 1
  }

  const options = {
    node: url,
    ssl: {
      rejectUnauthorized: false,
    },

  }

  const client = new Client(options)
  const { errors, data } = await graphql(query)
  if (errors) {
    console.error(errors)
    return 1
  } else {
    const searchData = selector(data)
    await setupIndex(client, pluginOptions)
    await indexToElasticSearch(client, searchIndex, searchData)
  }
}
