const fs = require('fs')
const fetchData = require('./fetch')
const path = require(`path`)
const configuration = require('../../content/configuration.js')

const loadManifestsFile = () => {
  const contents = fs.readFileSync(path.join(__dirname, '/../../content/manifests.json'))
  return JSON.parse(contents)
}

const getMDFile = (manifest, slug) => {
  const mdFile = `---
title: "${manifest.label[configuration.languages.default]}"
slug: "${slug}"
parent_id: "${manifest.parent_id}"
iiifJson___NODE: '${manifest.id}'
layout: "${manifest['type'].toLowerCase() === 'collection' ? 'collection' : 'item'}"
---
`
  return mdFile
}

/*
const request = require('request')
const download = async (uri, filename, callback) => {
  const getOptions = { uri, agentOptions: { family: 4 } }
  request.head(getOptions, async (err, res) => {
    if (err) {
      console.log('ERR:')
      console.log(err)
    }
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);

    await request(getOptions).pipe(fs.createWriteStream(filename)).on('close', callback)
  })
}

const dowloadAllFiles = async (assets) => {
  for (let i = 0; i < assets.length; i++) {
    const url = assets[i]
    const filename = path.basename(url)
    const filepath = path.join(__dirname, '/../../content/images/iiif/', filename)
    // await download(manifestData[key].assets[i], filepath, (data) => { })
  }
}
*/

const ensureDirectoryStructure = async () => {
  return Promise.all([
    fs.promises.mkdir(path.join(__dirname, '/../../content/iiif/'), { recursive: true }),
    fs.promises.mkdir(path.join(__dirname, '/../../content/markdown/iiif/'), { recursive: true }),
    // fs.promises.mkdir(path.join(__dirname, '/../../content/images/iiif/'), { recursive: true }),
  ])
}

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const manifestList = loadManifestsFile()
  const manifestData = await fetchData(manifestList.manifests)
  manifestData.forEach(async (manifest) => {
    // manifest.collection___NODE = manifestData[key].parent_id ? manifestData[key].parent_id : undefined
    // manifest.items___NODE = (manifest.collections || manifest.manifests || []).map(child => child['id'])

    const data = JSON.stringify(manifest)
    const filename = manifest.slug
    try {
      await ensureDirectoryStructure()

      await fs.writeFileSync(path.join(__dirname, '/../../content/iiif/' + filename + '.json'), data)
      await fs.writeFileSync(path.join(__dirname, '/../../content/markdown/iiif/' + filename + '.md'), getMDFile(manifest, filename))
    } catch (e) {
      console.log('catchy:')
      console.log(e)
      reject(e)
    }
  })
  resolve()
})
