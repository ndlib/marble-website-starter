const fs = require('fs')
const fetchData = require('./fetch')
const path = require(`path`)
const request = require('request')

const loadManifestsFile = () => {
  const contents = fs.readFileSync(path.join(__dirname, '/../../content/manifests.json'))
  return JSON.parse(contents)
}

const getMDFile = (manifest, slug) => {
  const mdFile = `---
title: '${manifest.label}'
slug: '${slug}'
parent_id: '${manifest.parent_id}'
iiifJson___NODE___fkid: '${manifest.fkid}'
---
`
  return mdFile
}

const download = async (uri, filename, callback) => {
  request.head(uri, function(err, res) {
    if (err) {
      console.log('ERR:')
      console.log(err)
    }
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);

    return request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  })
}

new Promise(async (resolve, reject) => {
  const manifestList = loadManifestsFile()
  const manifestData = await fetchData(manifestList.manifests)

  for (const key in manifestData) {
    let manifest = manifestData[key].manifest
    manifest['@id'] = manifest['@id'] + '2'
    manifest.id = manifest['@id']
    manifest.fkid = manifest['@id']
    manifest.collection___NODE = manifestData[key].parent_id ? manifestData[key].parent_id + '2' : undefined
    manifest.items___NODE = (manifest.collections || manifest.manifests || []).map(child => child['@id'] + '2')

    const data = JSON.stringify(manifest)
    const filename = key.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')

    try {
      await fs.promises.mkdir(path.join(__dirname, '/../../content/iiif/'), { recursive: true })
      await fs.promises.mkdir(path.join(__dirname, '/../../content/markdown/iiif/'), { recursive: true })
      await fs.promises.mkdir(path.join(__dirname, '/../../content/images/iiif/'), { recursive: true })

      await fs.writeFileSync(path.join(__dirname, '/../../content/iiif/' + filename + '.json'), data)
      await fs.writeFileSync(path.join(__dirname, '/../../content/markdown/iiif/' + filename + '.md'), getMDFile(manifest, filename))
      for (let i = 0; i < manifestData[key].assets.length; i++) {
        const url = manifestData[key].assets[i]
        const filename = path.basename(url)
        const filepath = path.join(__dirname, '/../../content/images/iiif/', filename)
        download(manifestData[key].assets[i], filepath, () => {})
      }
    } catch (e) {
      console.log(e)
      reject(e)
    }

    //
  }
  resolve()
})
