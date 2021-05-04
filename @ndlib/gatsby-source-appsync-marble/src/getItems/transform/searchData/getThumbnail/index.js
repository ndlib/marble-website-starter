const getFileType = require('../../getFileType')
const getIiif = require('../../getIiif')
module.exports = (item) => {
  if (item && item.files && Array.isArray(item.files.items)) {
    const iiifImageNode = item.files.items.find(f => {
      return getFileType(f.id) === 'image'
    })
    if (iiifImageNode) {
      const iiifImage = getIiif(iiifImageNode)
      if (iiifImage) {
        return iiifImage.thumbnail
      }
    }
  }
  return null
}
