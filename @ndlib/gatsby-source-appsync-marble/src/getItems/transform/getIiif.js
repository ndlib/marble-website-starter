const getFileType = require('./getFileType')

module.exports = (item) => {
  if (getFileType(item.mimeType) === 'image' && item.mediaServer && item.mediaResourceId) {
    item.mediaServer = item.mediaServer.replace('libraries', 'library')
    return {
      default: item.mediaServer + '/' + item.mediaResourceId + '/full/full/0/default.jpg',
      service: item.mediaServer + '/' + item.mediaResourceId,
      thumbnail: item.mediaServer + '/' + item.mediaResourceId + '/full/!250,250/0/default.jpg',
    }
  }
  return null
}
