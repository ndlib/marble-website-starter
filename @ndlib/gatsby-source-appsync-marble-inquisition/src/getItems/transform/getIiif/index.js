const getFileType = require('../getFileType')

module.exports = (item) => {
  if (item && getFileType(item.mimeType) === 'image' && item.mediaServer && item.mediaResourceId) {
    item.mediaServer = item.mediaServer.replace('libraries', 'library')
    return {
      default: item.mediaServer + '/' + item.mediaResourceId + '/full/full/0/default.jpg',
      service: item.mediaServer + '/' + item.mediaResourceId,
      thumbnail: item.mediaServer + '/' + item.mediaResourceId + '/full/!300,300/0/default.jpg',
    }
  }
  return null
}
