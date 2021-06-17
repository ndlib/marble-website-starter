const getIiif = require('../../getIiif')
module.exports = (item) => {
  if (item && item.images && Array.isArray(item.images.items)) {
    if (item.images.items.length > 0) {
      const iiifImage = getIiif(item.images.items[0])
      if (iiifImage) {
        return iiifImage.thumbnail
      }
    }
  }
  return null
}
