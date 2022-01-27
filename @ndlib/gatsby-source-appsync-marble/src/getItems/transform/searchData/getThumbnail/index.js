const getIiif = require('../../getIiif')
// eslint-disable-next-line complexity
module.exports = (item) => {
  if (item) {
    if (item.defaultImage) {
      const iiifImage = getIiif(item.defaultImage)
      if (iiifImage) {
        return iiifImage.thumbnail
      }
    } else if (item.images && Array.isArray(item.images.items) && item.images.items.length > 0) {
      const iiifImage = getIiif(item.images.items[0])
      if (iiifImage) {
        return iiifImage.thumbnail
      }
    }
  }
  return null
}
