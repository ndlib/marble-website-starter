const { Client } = require('elasticsearch')
const auth = require('http-aws-es')
const AWS = require('aws-sdk')
const marbleItemSearchQuery = require('./src/marbleItemSearchQuery')
const setupIndex = require('./src/setupIndex')
const indexToElasticSearch = require('./src/indexToElasticSearch')

exports.onPostBuild = async (
  gatsbyInternal,
  pluginOptions,
) => {
  if (process.env.GITHUB_ACTIONS) {
    return
  }
  const { graphql } = gatsbyInternal
  const { url, searchIndex, region } = pluginOptions
  const options = {
    host: url,
    port:443,
    protocol:'https',
    connectionClass: auth,
    requestTimeout: 1200000,
    awsConfig: new AWS.Config({ region: region }),
  }
  const client = Client(options)

  const { errors, data } = await graphql(marbleItemSearchQuery)
  if (errors) {
    console.error(errors)
    return 1
  } else {
    const searchData = data.allMarbleItem.nodes
    await setupIndex(client, searchIndex)
    await indexToElasticSearch(client, searchIndex, searchData)
  }
}
