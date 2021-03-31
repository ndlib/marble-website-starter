const fileExtension = new RegExp('.[0-9A-Za-z]+$')
const imageExtension = new RegExp('(tiff|tif|jpg|jpeg|png)$')
const audioExtension = new RegExp('(ogg|wav|mp3|m4a)$')
const videoExtension = new RegExp('(mov|mp4)$')
const pdfExtension = new RegExp('pdf$')
// const officeExtension = new RegExp('(doc|docx|xls|xlsx|ppt|pptx)$')
// const compressedExtensions = new RegExp('(zip|7z|bz2|gz|rar|tar)$')
const dataExtension = new RegExp('(json|xml)$')

module.exports = async (item, node, gatsbyInternal) => {
  const { actions, createContentDigest, createNodeId } = gatsbyInternal
  const { createNode } = actions
  const marbleFileObject = {
    id: createNodeId(item.id),
    name: getName(item, node),
    title: item.title,
    sequence: item.sequence,
    file: item.sourceUri,
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

// eslint-disable-next-line complexity
const getFileType = (id) => {
  let type = 'unknown'
  if (imageExtension.test(id)) {
    type = 'image'
  } else if (pdfExtension.test(id)) {
    type = 'pdf'
  } else if (audioExtension.test(id)) {
    type = 'audio'
  } else if (videoExtension.test(id)) {
    type = 'video'
  } else if (dataExtension.test(id)) {
    type = 'data'
  }
  return type
}

const getIiif = (item) => {
  if (getFileType(item.mimeType) === 'image' && item.mediaServer && item.mediaResourceId) {
    item.mediaServer = item.mediaServer.replace('libraries', 'library')
    return {
      default: item.mediaServer + '/' + item.mediaResourceId + '/full/full/0/default.jpg',
      service: item.mediaServer + '/' + item.mediaResourceId,
      thumbnail: item.mediaServer + '/' + item.mediaResourceId + '/full/!250,250/0/default.jpg',
    }
  }
  return null
}
