const fileMetadata = require('../mapStandardJson/fileMetadata')

module.exports = (item, gatsbyInternal) => {
  const { actions, createNodeId, createContentDigest } = gatsbyInternal
  const { createNode } = actions

  item.files.items.forEach(async (file) => {
    // Check to see if the node exists before creating.
    const parentId = createNodeId(item.id)
    const fileId = createNodeId(`${item.id}-${file.id}`)
    const filedata = fileMetadata(file)
    const normalizedTypeNode = {
      ...filedata,
      id: fileId,
      marbleId: file.id,
      collection: item.CollectionId,
      parentId: parentId,
    }
    normalizedTypeNode.internal.contentDigest = createContentDigest(normalizedTypeNode)
    return await createNode(normalizedTypeNode)
  })
}
