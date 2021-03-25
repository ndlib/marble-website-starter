const path = require('path')
const fileExtension = new RegExp('.[0-9A-Za-z]+$')
const imageExtension = new RegExp('.(tiff|tif|jpg|jpeg|png)$')
const audioExtension = new RegExp('.(ogg|wav|mp3|m4a)$')
const videoExtension = new RegExp('.(mov|mp4)$')
const pdfExtension = new RegExp('.pdf$')
// const officeExtension = new RegExp('.(doc|docx|xls|xlsx|ppt|pptx)$')
// const compressedExtensions = new RegExp('.(zip|7z|bz2|gz|rar|tar)$')
const dataExtension = new RegExp('.(json|xml)$')

module.exports = (standardJson) => {
  return {
    name: getName(standardJson),
    title: standardJson.title || standardJson.id,
    sequence: standardJson.sequence,
    file: standardJson.filePath || standardJson.id,
    extension: getExtension(standardJson.id),
    fileType: getFileType(standardJson.id),
    iiif: getIiif(standardJson),
    internal: {
      type: 'MarbleFile',
    },
    // marbleParent: ... linked in typeDef
    // local: ... linked in typeDef
  }
}

const getName = (standardJson) => {
  return standardJson.collectionId && standardJson.id ? `${standardJson.collectionId}-${standardJson.id.replace(fileExtension, '')}` : null
}

// eslint-disable-next-line complexity
const getFileType = (id) => {
  let type = 'unknown'
  if (imageExtension.test(id)) {
    type = 'image'
  } else if (audioExtension.test(id)) {
    type = 'audio'
  } else if (videoExtension.test(id)) {
    type = 'video'
  } else if (pdfExtension.test(id)) {
    type = 'pdf'
  } else if (dataExtension.test(id)) {
    type = 'data'
  }
  return type
}
const getExtension = (id) => {
  const matches = id.match(fileExtension)
  return matches ? matches[0].replace('.', '') : null
}

const getIiif = (file) => {
  if (getFileType(file.id) === 'image') {
    let baseUri
    let imagePath
    if (file.iiifImageServiceUri && file.filePath) {
      baseUri = file.iiifImageServiceUri.replace('libraries', 'library')
      imagePath = encodeURIComponent(file.filePath.replace(imageExtension, ''))
    } else {
      // TODO: THIS IS HERE FOR BACKWARDS SUPPORT WITH JSON FILES. EVENTUALLY REMOVE.
      // console.log(file.id)
      baseUri = new URL(file.iiifImageUri).origin
      imagePath = new URL(file.iiifImageUri).pathname
    }
    // TODO THIS NEEDS FIXED
    baseUri = baseUri.replace('libraries', 'library')
    return {
      default: baseUri + '/' + path.join(imagePath, 'full/full/0/default.jpg'),
      service: baseUri,
      thumbnail: baseUri + '/' + path.join(imagePath, 'full/!250,250/0/default.jpg'),
    }
  }
  return null
}
