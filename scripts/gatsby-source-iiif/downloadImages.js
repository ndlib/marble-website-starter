const fs = require('fs')
const path = require('path')
const https = require('https')
const batchPromises = require('batch-promises')
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
  const width = Math.min(info.width, 1024)
  const height = Math.min(info.height, 1024)
  return `${info['@id']}/full/!${width},${height}/0/default.jpg`
}
const getDestination = (info) => {
  return path.join(__dirname, `${directory}/content/images/iiif/${info.fileName.replace('%2F', '-').replace('.json', '.jpg')}`)
}

const download = ({ url, dest, ...options }) => new Promise((resolve, reject) => {
  https.get(url, options, response => {
    if (response.statusCode !== 200) {
      // Consume response data to free up memory
      response.resume()
      reject(new Error(`Request Failed. Status Code: ${response.statusCode}`))
    }

    response.on('error', (error) => {
      console.error(error)
      response.unpipe()
      reject(error)
    })

    response.pipe(fs.createWriteStream(dest))
      .once('close', () => {
        resolve({ filename: dest })
      })
  })
    .on('timeout', () => {
      const error = new Error('Timed out at server.')
      console.error(error)
      reject(error)
    })
    .on('error', (error) => {
      console.log(error)
      reject(error)
    })
})

// Start here
fs.readdir(path.join(__dirname, `${directory}/content/json/info`), async (err, fileNames) => {
  if (err) {
    console.error(err)
    return
  }

  await Promise.all(fileNames.map(async fileName => {
    if (!fileName.endsWith('.json')) {
      return null
    }
    const info = await loadJsonFile(path.join(__dirname, `${directory}/content/json/info/${fileName}`))
    info.fileName = fileName
    return info
  }))
    .then(infos => {
      const downloadedFiles = []
      const errors = []
      batchPromises(
        20,
        infos.filter(info => {
          return info !== null
        }),
        (info) =>
          new Promise((resolve) => {
            const url = getUrl(info)
            const destinationFile = getDestination(info)
            download({
              url: url,
              dest: destinationFile,
              timeout: 30000,
            })
              .then((result) => {
                console.log('Saved to', result.filename)
                downloadedFiles.push(result.filename)
                resolve(result)
              })
              .catch(error => {
                console.error(error)
                errors.push(error)
                resolve(error)
              })
          }),
      ).then(() => {
        console.log(`${downloadedFiles.length} files downloaded.`)
        console.log(`${errors.length} errors reported.`)
      }).catch(error => {
        console.error(error)
      })
    })
    .catch(error => console.error(error))
})
