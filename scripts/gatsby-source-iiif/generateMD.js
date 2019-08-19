const fs = require('fs')
const path = require(`path`)
const configuration = require('../../site/content/configuration.js')

const getMDFile = (manifest) => {
  const mdFile = `---
title: "${manifest.label[configuration.siteMetadata.languages.default]}"
slug: "${manifest.slug}"
iiifJson___NODE: '${manifest.id}'
layout: "${manifest['type'].toLowerCase() === 'collection' ? 'collection' : 'item'}"
---
`
  return mdFile
}

const readFile = path.join(__dirname, '/../../site/content/json/iiif/iiif.json')
const writeDirectory = path.join(__dirname, '/../../site/content/markdown/iiif/')

const data = fs.readFileSync(readFile)
const manifestData = JSON.parse(data.toString())

manifestData.forEach((manifest) => {
  const filename = manifest.id.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
  fs.writeFile(path.join(writeDirectory, filename + '.md'), getMDFile(manifest), (err) => {
    console.log('Writing: ', filename + '.md')
    if (err) {
      console.log(err)
    }
  })
})
