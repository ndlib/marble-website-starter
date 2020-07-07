const path = require('path')

const buildImageFields = (standardJson) => {
  // This will need to search for the first child (or grandchild) that has a valid image
  const iiifUrl = new URL(standardJson.iiifImageUri)

  return {
    default: iiifUrl.origin + path.join(iiifUrl.pathname, 'full/full/0/default.jpg'),
    service: standardJson.iiifImageUri,
    thumbnail: iiifUrl.origin + path.join(iiifUrl.pathname, 'full/400,/0/default.jpg'),
    itemId: '',
    coverImage: '',
    order: '',
    label: '',
    type: '',
  }
}

// Probably will not be able to reuse buildImageFields in a real scenario since buildImageFields will need to search for first good image.
module.exports = (standardJson) => {
  return searchForImages(standardJson)
}

const searchForImages = (standardJson) => {
  let allImages = []
  if (standardJson.items) {
    standardJson.items.forEach((item, i) => {
      if (item.level === 'file') {
        allImages.push(buildImageFields(item, i))
      } else if (item.level.toLowerCase() === 'collection' || item.level.toLowerCase() === 'manifest') {
        allImages = [...allImages, ...searchForImages(item)]
      }
    })
  }

  return allImages
}
