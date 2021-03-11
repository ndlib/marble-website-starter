const pruneEmptyLeaves = require('./src/pruneEmptyLeaves')
const { crawlStandardJson } = require('./src/crawlStandardJson')

exports.sourceNodes = async (gatsbyInternal, pluginOptions) => {
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

exports.onCreateNode = async (gatsbyInternal, pluginOptions) => {
  const { node } = gatsbyInternal

  if (node.internal.type === 'StandardJson' || node.internal.type === 'AppSyncStandard') {
    if (!pluginOptions.skipMetadataPrune) {
      pruneEmptyLeaves(node)
    }
    crawlStandardJson(node, null, null, gatsbyInternal)
  }
}
