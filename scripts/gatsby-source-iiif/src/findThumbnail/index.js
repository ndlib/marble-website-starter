const imageExtension = new RegExp('.(tiff|tif|jpg|jpeg|png|webp)$')

module.exports = (manifest) => {
  return depthFirstSearchForThumbnails(manifest)
}

// eslint-disable-next-line complexity
const depthFirstSearchForThumbnails = (manifest) => {
  // make sure there is an iiifImageUri and it is a valid image format (NO PDF)
  if (manifest.iiifImageUri && (imageExtension.test(manifest.filePath) || imageExtension.test(manifest.defaultFilePath) || imageExtension.test(manifest.id))) {
    return manifest.iiifImageUri + '/full/!250,250/0/default.jpg'
  }

  if (manifest.items && Array.isArray(manifest.items)) {
    return manifest.items.reduce((current, item) => {
      if (current) {
        return current
      }

      return depthFirstSearchForThumbnails(item)
    }, '')
  }

  return ''
}
