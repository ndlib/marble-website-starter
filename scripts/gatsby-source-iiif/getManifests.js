const fs = require('fs')
const fetchData = require('./src/fetchManifests')
const path = require(`path`)
const directory = process.argv.slice(2)[0]

const loadManifestsFile = () => {
  const contents = fs.readFileSync(path.join(directory, '/content/manifests.json'))
  return JSON.parse(contents)
}

const ensureDirectoryStructure = async () => {
  return Promise.all([
    fs.promises.mkdir(path.join(directory, '/content/json/iiif/'), { recursive: true }),
    fs.promises.mkdir(path.join(directory, '/content/markdown/iiif/'), { recursive: true }),
    fs.promises.mkdir(path.join(directory, '/content/json/items/'), { recursive: true }),
    fs.promises.mkdir(path.join(directory, '/content/markdown/browse/'), { recursive: true }),
  ])
}

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  await ensureDirectoryStructure()
  const manifestList = loadManifestsFile()

  let manifestIds = manifestList.manifest_ids
  if (process.env.CI) {
    manifestIds = manifestList.ci_manfest_ids
  }

  const manifests = manifestIds.map((id) => {
    return 'https://presentation-iiif.library.nd.edu/' + id + '/manifest'
  })

  const manifestData = await fetchData(manifests)
  const data = JSON.stringify(manifestData)
  fs.writeFileSync(path.join(directory, '/content/json/iiif/iiif.json'), data)

  resolve()
})
