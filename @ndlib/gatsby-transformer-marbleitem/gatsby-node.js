const pruneEmptyLeaves = require('./src/pruneEmptyLeaves')
const { crawlStandardJson } = require('./src/crawlStandardJson')

exports.sourceNodes = async (gatsbyInternal, pluginOptions) => {
  makeMarbleNodes(gatsbyInternal, pluginOptions)
}

exports.onCreateNode = async (gatsbyInternal, pluginOptions) => {
  makeMarbleNodes(gatsbyInternal, pluginOptions)
}

const makeMarbleNodes = async (gatsbyInternal, pluginOptions) => {
  const { getNodesByType } = gatsbyInternal
  const standardJsonNodes = getNodesByType('StandardJson')
  const appsyncStandardNodes = getNodesByType('AppSyncStandard')
  const standardNodes = [...standardJsonNodes, ...appsyncStandardNodes]

  standardNodes.forEach(node => {
    if (!pluginOptions.skipMetadataPrune) {
      pruneEmptyLeaves(node)
    }
    crawlStandardJson(node, null, null, gatsbyInternal)
  })
}
