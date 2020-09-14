const path = require('path')

module.exports = (standardJson) => {
  // This will need to search for the first child (or grandchild) that has a valid image
  const iiifUrl = new URL(standardJson.iiifImageUri)
  const fileExtensionRegEx = new RegExp('.(tiff|tif|jpg|jpeg|png)')
  return {
    default: iiifUrl.origin + path.join(iiifUrl.pathname, 'full/full/0/default.jpg'),
    service: standardJson.iiifImageUri,
    thumbnail: iiifUrl.origin + path.join(iiifUrl.pathname, 'full/!250,250/0/default.jpg'),
    sequence: standardJson.sequence,
    title: standardJson.title,
    name: standardJson.collectionId && standardJson.id ? `${standardJson.collectionId}-${standardJson.id.replace(fileExtensionRegEx, '')}` : null,
    extension: 'jpg',
  }
}
