const getIiif = require('./getIiif')
const getFileType = require('./getFileType')
const fileExtension = new RegExp('.[0-9A-Za-z]+$')

module.exports = async (item, node, gatsbyInternal) => {
  const { actions, createContentDigest, createNodeId } = gatsbyInternal
  const { createNode } = actions
  const marbleFileObject = {
    id: createNodeId(item.id),
    name: getName(item, node),
    title: item.title,
    sequence: item.sequence,
    file: item.sourceUri ? item.sourceUri.replace('http://archives.nd.edu', 'https://archives.nd.edu') : null,
    fileType: getFileType(item.id),
    iiif: getIiif(item),
    parentId: node.id,
  }
  const nodeContent = JSON.stringify(marbleFileObject)
  const normalizedTypeNode = {
    ...marbleFileObject,
    internal: {
      type: 'MarbleFile',
      content: nodeContent,
      contentDigest: createContentDigest(marbleFileObject),
    },
  }
  await createNode(normalizedTypeNode)
  return normalizedTypeNode
}

const getName = (item, node) => {
  return node.collectionId && item.id ? `${node.collectionId}-${item.id.replace(fileExtension, '')}` : null
}
