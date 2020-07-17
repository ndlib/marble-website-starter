const fs = require('fs')
const path = require('path')
const download = require('image-downloader')
const directory = process.argv.slice(2)[0]
const retryLimit = 4

const loadJsonFile = async (pathName) => {
  const contents = fs.readFileSync(pathName)
  return JSON.parse(contents)
}

const getUrl = (info) => {
  // https://iiif.io/api/image/2.0/#size
  // !w,h
  // The image content is scaled for the best fit such that the resulting width and height are less than or equal to the requested width and height. The exact scaling may be determined by the service provider, based on characteristics including image quality and system performance. The dimensions of the returned image content are calculated to maintain the aspect ratio of the extracted region.
  const width = Math.min(info.width, 800)
  const height = Math.min(info.height, 800)
  return `${info['@id']}/full/!${width},${height}/0/default.jpg`
}

const downLoadUntilGood = async (fileName, myArray, badArray, count = 0) => {
  if (count <= retryLimit) {
    const name = fileName.replace('.json', '')
    const info = await loadJsonFile(path.join(__dirname, `${directory}/content/json/info/${fileName}`))

    const url = getUrl(info)
    const filePath = path.join(__dirname, `${directory}/content/images/iiif/${name.replace('%2F', '-')}.jpg`)

    const result = await download.image({
      url: url,
      dest: filePath,
    })
      .then(({ filename }) => {
        myArray.push(url)
        console.log('Saved to', filename)
      })
      .catch(error => {
        if (count === retryLimit) {
          console.error('Reached retry limit of "' + retryLimit + '" for ' + url)
          badArray.push(url)
        } else {
          console.error('fetch error (' + count + '), retrying:', url)
          downLoadUntilGood(fileName, myArray, badArray, ++count)
        }
        return error
      })
    return result
  }
}

fs.readdir(path.join(__dirname, `${directory}/content/json/info`), async (err, fileNames) => {
  const finalResult = []
  const errorResult = []
  if (err) {
    console.error(err)
    return
  }
  await Promise.all(fileNames.map(async fileName => {
    if (!fileName.endsWith('.json')) {
      return
    }
    const result = await downLoadUntilGood(fileName, finalResult, errorResult)
    return result
  }))
    .then(() => {
      // Log errors for now
      errorResult.length > 0 ? console.error('Could not process the following: [' + errorResult.join(', ') + '].') : console.log('Successfully processed all items.')
      console.log('Processed Items: ', finalResult.length)
    })
    .catch(error => console.error(error))
})
