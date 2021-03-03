const pruneEmptyLeaves = require('./src/pruneEmptyLeaves')
const { crawlStandardJson } = require('./src/crawlStandardJson')

async function onCreateNode ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  getNode,
}, pluginOptions = { skipMetadataPrune: false }) {
  if (node.internal.type === 'StandardJson' || node.internal.type === 'AppSyncStandard') {
    if (!pluginOptions.skipMetadataPrune) {
      pruneEmptyLeaves(node)
    }
    crawlStandardJson(node, null, null, {
      node: node,
      actions: actions,
      createNodeId: createNodeId,
      createContentDigest: createContentDigest,
      getNode: getNode,
    })
  }
}

exports.onCreateNode = onCreateNode
