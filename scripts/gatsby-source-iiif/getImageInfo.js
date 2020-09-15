const fs = require('fs')
const path = require('path')
const https = require('https')
const batchPromises = require('batch-promises')
const directory = process.argv.slice(2)[0]

const loadJsonFile = async (pathName) => {
  const contents = fs.readFileSync(pathName)
  return JSON.parse(contents)
}

// eslint-disable-next-line complexity
const findImageIds = async (jsonFile) => {
  const images = []
  if (jsonFile && jsonFile.level && jsonFile.level.toLowerCase() === 'manifest') {
    if (jsonFile.items && Array.isArray(jsonFile.items)) {
      jsonFile.items.forEach(item => {
        if (item.iiifImageUri) {
          images.push(item.iiifImageUri)
        }
      })
    }
  } else if (jsonFile && jsonFile.level && jsonFile.level.toLowerCase() === 'collection') {
    if (jsonFile.items && Array.isArray(jsonFile.items)) {
      jsonFile.items.forEach(item => {
        if (item.items && Array.isArray(item.items)) {
          item.items.forEach(childItem => {
            if (childItem.iiifImageUri) {
              images.push(childItem.iiifImageUri)
            }
          })
        }
      })
    }
  } else {
    console.log(`No images found for ${jsonFile.id}`)
  }
  return images
}
const getDestination = (info) => {
  return path.join(__dirname, `${directory}/content/json/info/${info.replace('https://image-iiif.library.nd.edu/iiif/2/', '').replace('%2F', '-')}.json`)
}
const download = ({ url, dest, ...options }) => new Promise((resolve, reject) => {
  https.get(url, options, response => {
    if (response.statusCode !== 200) {
      // Consume response data to free up memory
      response.resume()
      reject(new Error(`Request Failed. Status Code: ${response.statusCode}`))
    } else {
      response.on('error', (error) => {
        console.error(error)
        reject(error)
      })

      response.pipe(fs.createWriteStream(dest))
        .once('close', () => {
          resolve({ filename: dest })
        })
    }
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
fs.readdir(path.join(__dirname, `${directory}/content/json/nd`), async (err, fileNames) => {
  if (err) {
    console.error(err)
  }

  await Promise.all(fileNames.map(async fileName => {
    if (!fileName.endsWith('.json')) {
      return null
    }
    const standardJson = await loadJsonFile(path.join(__dirname, `${directory}/content/json/nd/${fileName}`))
    standardJson.fileName = fileName
    return standardJson
  }))
    .then(async standardJsons => {
      let imageArray = []
      await standardJsons
        .filter(sj => sj !== null)
        .forEach(async standardJson => {
          const result = await findImageIds(standardJson)
          imageArray = imageArray.concat(result)
        })
      return imageArray
    }).then(imageArray => {
      const downloadedFiles = []
      const errors = []
      batchPromises(
        200,
        imageArray.filter(info => {
          return info !== null
        }),
        (info) =>
          new Promise((resolve) => {
            const url = `${info}/info.json`
            const destinationFile = getDestination(info)
            // console.log(url)
            download({
              url: url,
              dest: destinationFile,
              timeout: 30000,
            })
              .then((result) => {
                // console.log('Saved to', result.filename)
                downloadedFiles.push(result.filename)
                resolve(result)
              })
              .catch(error => {
                // console.error(error)
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
})
