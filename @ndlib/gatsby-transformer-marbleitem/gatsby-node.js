const mapStandardJson = require('./src/mapStandardJson')
const pruneEmptyLeaves = require('./src/pruneEmptyLeaves')
const fileMetadata = require('./src/mapStandardJson/fileMetadata')
async function onCreateNode ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}, pluginOptions = { skipMetadataPrune: false }) {
  const { createNode, createParentChildLink } = actions

  // eslint-disable-next-line complexity
  const crawlStandardJson = (standardJson, collection, parent) => {
    const nodeId = createNodeId(standardJson.id)
    if (standardJson.level.toLowerCase() === 'file') {
      const filedata = fileMetadata(standardJson)
      const normalizedTypeNode = {
        ...filedata,
        id: nodeId,
        marbleId: standardJson.id,
        collection: collection.id,
        parentId: parent.id,
      }
      normalizedTypeNode.internal.contentDigest = createContentDigest(normalizedTypeNode)
      createNode(normalizedTypeNode)
      createParentChildLink({ parent: collection, child: normalizedTypeNode })
      createParentChildLink({ parent: parent, child: normalizedTypeNode })

      return
    }

    const mappedFields = mapStandardJson(standardJson)

    const normalizedTypeNode = {
      ...mappedFields,
      id: nodeId,
      marbleId: standardJson.id,
      parentId: parent ? parent.id : null,
      internal: {
        type: 'MarbleItem',
      },
    }

    if (!collection) {
      collection = normalizedTypeNode
    }

    if (parent) {
      // call create link
      normalizedTypeNode.parent = parent.id
      createParentChildLink({ parent: parent, child: normalizedTypeNode })
    }

    normalizedTypeNode.internal.contentDigest = createContentDigest(normalizedTypeNode)
    createNode(normalizedTypeNode)

    if (standardJson.items) {
      standardJson.items.forEach(item => {
        crawlStandardJson(item, collection, normalizedTypeNode)
      })
    }
  }

  if (node.internal.type === 'StandardJson') {
    if (!pluginOptions.skipMetadataPrune) {
      pruneEmptyLeaves(node)
    }
    crawlStandardJson(node)
  }
}

exports.onCreateNode = onCreateNode
