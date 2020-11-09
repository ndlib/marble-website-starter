const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const directory = process.argv.slice(2)[0]
const retryLimit = 4

const loadManifestsFile = () => {
  const contents = fs.readFileSync(path.join(__dirname, '/../../site/content/manifests.json'))
  return JSON.parse(contents)
}

const fetchData = async (seeAlso) => {
  const finalResult = []
  const errorResult = []
  await Promise.all(seeAlso.map(async item => {
    const url = 'https://presentation-iiif.library.nd.edu/' + item + '/standard'
    const result = await fetchUntilGood(url, finalResult, errorResult, 0)
    return result
  }))
    .then(() => {
      // one big blob
      // fs.writeFileSync(path.join(directory, '/content/items/items.json'), JSON.stringify(finalResult))
      // individual files
      finalResult.forEach(result => {
        // escape is not useless but required
        // eslint-disable-next-line no-useless-escape
        const regex = new RegExp('[.\s]', 'g')
        fs.writeFileSync(path.join(directory, `/content/json/nd/${result.id.trim().replace(regex, '_')}.json`), JSON.stringify(result, null, 2))
      })
    })
    .catch(error => {
      console.error('Promise error: ', error)
      return error
    })

  // Log errors for now
  errorResult.length > 0 ? console.error('Could not process the following: [' + errorResult.join(', ') + '].') : console.log('Successfully processed all items.')

  console.log('Processed Items: ', finalResult.length)

  return finalResult
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

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const rawIds = await loadManifestsFile()

  let manifestIds = rawIds.manifest_ids
  if (process.env.TRAVIS_RUN) {
    manifestIds = rawIds.travis_manfest_ids
  }

  const fetchResult = await fetchData(manifestIds)
  if (!fetchResult) {
    reject(fetchResult)
  }
  resolve()
})
