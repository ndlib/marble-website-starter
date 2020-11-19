const fs = require('fs')
const path = require('path')
const https = require('https')
const batchPromises = require('batch-promises')
const directory = process.argv.slice(2)[0] || '../../site'

const loadManifestsFile = () => {
  const contents = fs.readFileSync(path.join(__dirname, `${directory}/content/manifests.json`))
  return JSON.parse(contents)
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

const downloadStandardJson = async () => {
  const rawIds = loadManifestsFile()
  let standardIds = rawIds.manifest_ids
  if (process.env.TRAVIS_RUN) {
    standardIds = rawIds.travis_manfest_ids
  }
  const downloadedFiles = []
  const errors = []
  await batchPromises(
    500,
    standardIds,
    id => new Promise((resolve) => {
      const url = `https://presentation-iiif.library.nd.edu/${id}/standard`
      const dest = path.join(__dirname, `${directory}/content/json/nd/${id}.json`)
      download({
        url: url,
        dest: dest,
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
}

const executeWithTimer = async () => {
  const start = new Date()

  await downloadStandardJson()
  const endTime = new Date() - start
  console.log(`Time elapsed: ${endTime / 1000.0} seconds`)
}

// start here
executeWithTimer()