const fs = require('fs')
const { promisify } = require('util')
const path = require(`path`)
const configuration = require('../../content/configuration.js')

const getMDFile = (manifest) => {
  const mdFile = `---
title: "${manifest.label[configuration.languages.default]}"
slug: "${manifest.slug}"
iiifJson___NODE: '${manifest.id}'
layout: "${manifest['type'].toLowerCase() === 'collection' ? 'collection' : 'item'}"
---
`
  return mdFile
}

const readDirectory = path.join(__dirname, '/../../content/iiif/')
const writeDirectory = path.join(__dirname, '/../../content/markdown/iiif/')

promisify(fs.readdir)(readDirectory).then((filenames) => {
  filenames = filenames.filter((file) => {
    return file.match(/.*\.(json)/ig)
  })
  return Promise.all(filenames.map((filename) => {
    return promisify(fs.readFile)(readDirectory + filename, { encoding: 'utf8' })
  }))
}).then((strArr) => {
  // optional:
  strArr.forEach((str) => {
    const manifest = JSON.parse(str)
    const filename = manifest.id.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
    fs.writeFile(path.join(writeDirectory, filename + '.md'), getMDFile(manifest), (err) => {
      console.log('Writing: ', filename + '.md')
      if (err) {
        console.log(err)
      }
    })
  })
  // send data here
}).catch((err) => {
  console.log(err)
})
