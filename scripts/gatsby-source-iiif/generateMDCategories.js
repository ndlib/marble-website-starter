const fs = require('fs')
const path = require(`path`)

const getMDFile = (manifest) => {
  let subcategories = ''
  if (manifest.subcategories) {
    subcategories = `
  - component: CardGroup
    props:
      - label: "label"
        value: "Featured"
    components:`
    manifest.subcategories.forEach((category) => {
      const categoryManifest = getManifest(category)
      subcategories += `
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
  let search = ''
  if (manifest.manifest_ids) {
    search = `
  - component: SavedSearch
    props:
      - label: 'terms'
        value: "${manifest.id}"`
  }

  const mdFile = `---
title: "${manifest.label}"
slug: "browse/${manifest.id}"
menu: "browse"
components:
  - component: MarkdownHtmlContent${subcategories}${search}
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
