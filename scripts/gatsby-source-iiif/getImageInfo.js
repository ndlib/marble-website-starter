const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const directory = process.argv.slice(2)[0]
const retryLimit = 4

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
        if (item.items && Array.isArray(item.items) && item.items[0].iiifImageUri) {
          images.push(item.items[0].iiifImageUri)
        }
      })
    }
  } else {
    console.log(`No images found for ${jsonFile.id}`)
  }
  // console.log(images.join('\n'))
  return images
}

const downloadInfos = async (imageIds) => {
  const localResult = []
  const localErrors = []

  // The site only needs at most 5 images, the rest are handled in Mirador for now.
  imageIds.length = Math.min(imageIds.length, 5)
  await Promise.all(imageIds.map(async id => {
    const url = `${id}/info.json`
    const result = await fetchUntilGood(url, localResult, localErrors, 0)
    return result
  }))
    .then(() => {
      // individual files
      localResult.forEach(result => {
        if (result['@id']) {
          const fileName = result['@id'].replace('https://image-iiif.library.nd.edu/iiif/2/', '')
          fs.writeFileSync(path.join(directory, `/content/json/info/${fileName}.json`), JSON.stringify(result, null, 2))
        }
      })
    })
    .catch(error => {
      console.error('Promise error: ', error)
      return error
    })
  return localResult
}

const fetchUntilGood = async (url, myArray, badArray, count = 0) => {
  if (count <= retryLimit) {
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        myArray.push(data)
      })
      .catch(error => {
        if (count === retryLimit) {
          console.error('Reached retry limit of "' + retryLimit + '" for ' + url)
          badArray.push(url)
        } else {
          // console.error('fetch error (' + count + '), retrying:', url)
          fetchUntilGood(url, myArray, badArray, ++count)
        }
        return error
      })
  }
}

const getInfo = async (pathName) => {
  const jsonFile = await loadJsonFile(pathName)
  const imageIds = await findImageIds(jsonFile)
  const infoResults = await downloadInfos(imageIds)
  return infoResults
}

fs.readdir(path.join(__dirname, `${directory}/content/json/nd`), async (err, fileNames) => {
  if (err) {
    console.error(err)
    return
  }
  await Promise.all(fileNames.map(async fileName => {
    if (!fileName.endsWith('.json')) {
      return
    }
    const result = await getInfo(path.join(__dirname, `${directory}/content/json/nd/${fileName}`))
    return result
  }))
    .then(() => {
      console.log('done')
    })
    .catch(error => console.error(error))
})
