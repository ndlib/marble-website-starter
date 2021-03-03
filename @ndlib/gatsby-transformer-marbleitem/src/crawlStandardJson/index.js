const mapStandardJson = require('../mapStandardJson')
const fileMetadata = require('../mapStandardJson/fileMetadata')
const crawlAppSyncFiles = require('./crawlAppSyncFiles')

// eslint-disable-next-line complexity
const crawlStandardJson = (standardJson, collection, parent, gatsbyInternal) => {
  const { actions, createNodeId, createContentDigest } = gatsbyInternal
  const { createNode, createParentChildLink } = actions
  const nodeId = createNodeId(standardJson.id)
  if (standardJson.level && standardJson.level.toLowerCase() === 'file') {
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
      crawlStandardJson(item, collection, normalizedTypeNode, gatsbyInternal)
    })
  } else if (standardJson.subItems) {
    standardJson.subItems.forEach(item => {
      crawlStandardJson(item, collection, normalizedTypeNode, gatsbyInternal)
    })
  }
  if (standardJson.files && standardJson.files.items && standardJson.files.items.length > 0) {
    crawlAppSyncFiles(standardJson, gatsbyInternal)
  }
}
exports.crawlStandardJson = crawlStandardJson
