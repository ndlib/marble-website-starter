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

const fixLanguage = (data) => {
  if (!data) {
    return undefined
  }
  if (typeof (data) !== 'object') {
    if (!Array.isArray(data)) {
      data = [data]
    }
    const save = data
    data = { }
    data[configuration.languages.default] = save
  }

  const ret = {}
  configuration.languages.allowed.forEach((lang) => {
    if (data[lang]) {
      ret[lang] = data[lang]
    } else {
      ret[lang] = ['']
    }
  })
  return ret
}

const traverse = (o, func) => {
  for (const i in o) {
    if (objectIsLabelORValue(i, o[i])) {
      o[i] = fixLanguage(o[i])
    } else if (continueTraversing(o[i])) {
      // going one step down in the object tree!!
      traverse(o[i], func)
    }
  }
}

const objectIsLabelORValue = (key, obj) => {
  return ((key === 'label' || key === 'value') && typeof (obj[key]) === 'object')
}

const continueTraversing = (obj) => {
  return (obj !== null && typeof (obj) === 'object')
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
    fs.promises.mkdir(path.join(__dirname, '/../../content/images/iiif/'), { recursive: true }),
  ])
}

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const manifestList = loadManifestsFile()
  const manifestData = await fetchData(manifestList.manifests)
  for (const key in manifestData) {
    const manifest = manifestData[key].manifest
    traverse(manifest, process)

    manifest.collection___NODE = manifestData[key].parent_id ? manifestData[key].parent_id : undefined
    manifest.items___NODE = (manifest.collections || manifest.manifests || []).map(child => child['id'])

    const data = JSON.stringify(manifest)
    const filename = key.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
    try {
      await ensureDirectoryStructure()

      await fs.writeFileSync(path.join(__dirname, '/../../content/iiif/' + filename + '.json'), data)
      await fs.writeFileSync(path.join(__dirname, '/../../content/markdown/iiif/' + filename + '.md'), getMDFile(manifest, filename))
    } catch (e) {
      console.log('catchy:')
      console.log(e)
      reject(e)
    }
  }
  resolve()
})
