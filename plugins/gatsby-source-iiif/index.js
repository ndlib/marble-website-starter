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
