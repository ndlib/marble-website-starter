
module.exports = (manifest) => {
  return depthFirstSearchForThumbnails(manifest)
}

const depthFirstSearchForThumbnails = (manifest) => {
  if (manifest.iiifImageUri) {
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
