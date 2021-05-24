module.exports = async (image, structure, gatsbyInternal) => {
  const { actions, createContentDigest, createNodeId } = gatsbyInternal
  const { createNode } = actions
  const fieldData = image.fieldData
  const imageObject = {
    id: createNodeId(image.recordId),
    filename: fieldData.imageFilename,
    imageLocation: fieldData.imagelocation,
    associatedStructure: fieldData.AssociatedStructure,
  }
  const nodeContent = JSON.stringify(imageObject)
  const normalizedTypeNode = {
    ...imageObject,
    internal: {
      type: 'SeasideImage',
      content: nodeContent,
      contentDigest: createContentDigest(imageObject),
    },
  }
  await createNode(normalizedTypeNode)
  return normalizedTypeNode
}
