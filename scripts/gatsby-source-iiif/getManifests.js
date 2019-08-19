const fs = require('fs')
const fetchData = require('./src/fetchManifests')
const path = require(`path`)

const loadManifestsFile = () => {
  const contents = fs.readFileSync(path.join(__dirname, '/../../site/content/manifests.json'))
  return JSON.parse(contents)
}

const ensureDirectoryStructure = async () => {
  return Promise.all([
    fs.promises.mkdir(path.join(__dirname, '/../../site/content/json/iiif/'), { recursive: true }),
    fs.promises.mkdir(path.join(__dirname, '/../../site/content/markdown/iiif/'), { recursive: true }),
    fs.promises.mkdir(path.join(__dirname, '/../../site/content/json/search/'), { recursive: true }),
    fs.promises.mkdir(path.join(__dirname, '/../../site/content/markdown/browse/'), { recursive: true }),
  ])
}

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  await ensureDirectoryStructure()
  const manifestList = loadManifestsFile()

  const manifestData = await fetchData(manifestList.manifests)
  const data = JSON.stringify(manifestData)
  fs.writeFileSync(path.join(__dirname, '/../../site/content/json/iiif/iiif.json'), data)

  resolve()
})
