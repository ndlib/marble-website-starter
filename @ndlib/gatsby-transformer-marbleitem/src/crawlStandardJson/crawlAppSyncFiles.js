const fileMetadata = require('../mapStandardJson/fileMetadata')

module.exports = (item, gatsbyInternal) => {
  const { actions, createNodeId, createContentDigest, getNode } = gatsbyInternal
  const { createNode, createParentChildLink } = actions

  item.files.items.forEach(async (file) => {
    // console.log('file:', file.id)
    let fileNode = getNode(file.id)
    if (!fileNode) {
      const filedata = fileMetadata(file)
      const normalizedTypeNode = {
        ...filedata,
        id: file.id,
        marbleId: file.id,
        collection: item.CollectionId,
        parentId: createNodeId(item.id),
      }
      normalizedTypeNode.internal.contentDigest = createContentDigest(normalizedTypeNode)
      fileNode = await createNode(normalizedTypeNode)
    } else {
      // console.log('FILE NODE EXISTS')
    }
  })
}
