const pruneEmptyLeaves = require('./src/pruneEmptyLeaves')
const { crawlStandardJson } = require('./src/crawlStandardJson')

exports.onCreateNode = async (gatsbyInternal, pluginOptions) => {
  const { node } = gatsbyInternal
  if (node.internal.type === 'StandardJson') {
    if (!pluginOptions.skipMetadataPrune) {
      pruneEmptyLeaves(node)
    }
    crawlStandardJson(node, null, null, gatsbyInternal)
  }
}
