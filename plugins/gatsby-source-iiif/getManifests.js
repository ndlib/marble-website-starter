const fs = require('fs')
const fetchData = require('./src/fetchManifests')
const path = require(`path`)

const loadManifestsFile = () => {
  const contents = fs.readFileSync(path.join(__dirname, '/../../content/manifests.json'))
  return JSON.parse(contents)
}

const ensureDirectoryStructure = async () => {
  return Promise.all([
    fs.promises.mkdir(path.join(__dirname, '/../../content/iiif/'), { recursive: true }),
    fs.promises.mkdir(path.join(__dirname, '/../../content/markdown/iiif/'), { recursive: true }),
    fs.promises.mkdir(path.join(__dirname, '/../../content/search/iiif/'), { recursive: true }),
  ])
}

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const manifestList = loadManifestsFile()
  const manifestData = await fetchData(manifestList.manifests)
  manifestData.forEach(async (manifest) => {
    const data = JSON.stringify(manifest)
    const filename = manifest.id.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
    try {
      await ensureDirectoryStructure()

      await fs.writeFileSync(path.join(__dirname, '/../../content/iiif/' + filename + '.json'), data)
    } catch (e) {
      console.log('catchy:')
      console.log(e)
      reject(e)
    }
  })
  resolve()
})
