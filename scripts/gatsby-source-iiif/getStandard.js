const fs = require('fs')
const path = require('path')
const https = require('https')
const batchPromises = require('batch-promises')
const envfile = process.argv.slice(2)[0] || '../../site/marble/.env.development'
const directory = path.dirname(envfile)
const manifestsFile = path.join(directory, 'content/manifests.json')

try {
  if (!fs.existsSync(path)) {
    console.log('No Manifest file for site' + directory)
    return
  }
} catch {
  console.log('No Manifest file for site' + directory)
  return
}

const loadManifestsFile = () => {
  const contents = fs.readFileSync(path.join(directory, manifestsFile))
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
  if (process.env.CI) {
    standardIds = rawIds.ci_manfest_ids
  }
  const downloadedFiles = []
  const errors = []
  await batchPromises(
    500,
    standardIds,
    id => new Promise((resolve) => {
      const url = `https://presentation-iiif.library.nd.edu/${id}/standard`
      const dest = path.join(directory, `content/json/standard/${id}.json`)
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
