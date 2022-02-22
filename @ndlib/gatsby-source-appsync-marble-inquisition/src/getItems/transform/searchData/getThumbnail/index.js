const getIiif = require('../../getIiif')
// eslint-disable-next-line complexity
module.exports = (item) => {
  if (item) {
    // some fields may not be null when there is no defaultImage so check the two we care about
    if (item.defaultImage && item.defaultImage.mediaServer && item.defaultImage.mediaResourceId) {
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
