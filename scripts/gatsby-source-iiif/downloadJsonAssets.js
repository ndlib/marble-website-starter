const fetch = require('node-fetch')
const fs = require('fs')
const path = require(`path`)
const directory = process.argv.slice(2)[0]
// eslint-disable-next-line
new Promise(async (resolve, reject) => {

  await Promise.all([
    fetch('https://presentation-iiif.library.nd.edu/000000_temp_build_documents/iiif')
      .then(response => response.text())
      .then((data) => {
        fs.writeFileSync(path.join(directory, '/content/json/iiif/iiif.json'), data)

        return true
      }).catch(err => console.log('fetch error', err)),

    fetch('https://presentation-iiif.library.nd.edu/000000_temp_build_documents/items')
      .then(response => response.text())
      .then((data) => {
        fs.writeFileSync(path.join(directory, '/content/json/items/items.json'), data)

        return true
      }).catch(err => console.log('fetch error', err)),
  ])
  resolve()
})
