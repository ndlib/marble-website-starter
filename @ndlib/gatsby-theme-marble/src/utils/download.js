import Downloader from 'js-file-downloader'
export const download = (
  url,
  filename,
  callback = () => {},
  errorFunc = (e) => {
    console.error(e)
  },
) => {
  new Downloader({
    url: url,
    filename: filename,
  })
    .then(() => {
      callback()
    })
    .catch((e) => {
      errorFunc(e)
    })
}
export default download
