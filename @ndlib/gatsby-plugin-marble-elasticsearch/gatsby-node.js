const { Client } = require('elasticsearch')
const auth = require('http-aws-es')
const AWS = require('aws-sdk')
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
    host: url,
    port:443,
    protocol:'https',
    connectionClass: auth,
    requestTimeout: 1800000000,
    awsConfig: new AWS.Config({ region: region }),
  }

  const client = Client(options)
  console.log('requestTimeout', client.requestTimeout)
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
