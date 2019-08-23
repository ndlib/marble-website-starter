const fs = require('fs')
const path = require(`path`)

const getMDFile = (manifest) => {
  let mdFile = `---
title: "${manifest.label}"
slug: "browse/${manifest.id}"`
  if (manifest.tag) {
    mdFile += `
defaultSearch:
  - tag: ${manifest.tagField}:${manifest.label.replace(' ', '')}
layout: "browseSearchPage"
    `
  }
  if (manifest.subcategories) {
    mdFile += `
components:
  - component: MarkdownHtmlContent
  - component: CardGroup
    components:`
    manifest.subcategories.forEach((category) => {
      console.log(category)
      const categoryManifest = getManifest(category)
      mdFile += `
      - component: Card
        props:
          - label: "label"
            value: "${categoryManifest.label}"
          - label: "image"
            value: "${categoryManifest.thumbnail}/full/500,/0/default.jpg"
          - label: "target"
            value: "browse/${category}"`
    })
  }

  mdFile += `
---
${manifest.description}
`
  return mdFile
}

const getManifest = (id) => {
  return manifestData.find((manifest) => {
    return (manifest.id === id)
  })
}

const readFile = path.join(__dirname, '/../../site/content/categories.json')
const writeDirectory = path.join(__dirname, '/../../site/content/markdown/browse/')

const data = fs.readFileSync(readFile)
const manifestData = JSON.parse(data.toString())

manifestData.forEach((manifest) => {
  const filename = manifest.id
  fs.writeFile(path.join(writeDirectory, filename + '.md'), getMDFile(manifest), (err) => {
    console.log('Writing: ', filename + '.md')
    if (err) {
      console.log(err)
    }
  })
})

/*
components:
  - component: SavedSearch
    props:
      - label: 'terms'
        value: "${manifest.id}"

*/
