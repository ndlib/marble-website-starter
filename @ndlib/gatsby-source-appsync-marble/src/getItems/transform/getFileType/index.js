const imageExtension = new RegExp('(tiff|tif|jpg|jpeg|png)$')
const audioExtension = new RegExp('(ogg|wav|mp3|m4a)$')
const videoExtension = new RegExp('(mov|mp4)$')
const pdfExtension = new RegExp('pdf$')
// const officeExtension = new RegExp('(doc|docx|xls|xlsx|ppt|pptx)$')
// const compressedExtensions = new RegExp('(zip|7z|bz2|gz|rar|tar)$')
const dataExtension = new RegExp('(json|xml)$')

// eslint-disable-next-line complexity
module.exports = (id) => {
  let type = 'unknown'
  if (imageExtension.test(id)) {
    type = 'image'
  } else if (pdfExtension.test(id)) {
    type = 'pdf'
  } else if (audioExtension.test(id)) {
    type = 'audio'
  } else if (videoExtension.test(id)) {
    type = 'video'
  } else if (dataExtension.test(id)) {
    type = 'data'
  }
  return type
}
