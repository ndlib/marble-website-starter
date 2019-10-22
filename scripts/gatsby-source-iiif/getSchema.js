const fs = require('fs')
const fetchData = require('./src/fetchManifests')
const path = require(`path`)

const loadIIIFData = () => {
  const contents = fs.readFileSync(path.join(__dirname, '/../../site/content/json/iiif/iiif.json'))
  return JSON.parse(contents)
}

const getSchemaSeeAlsoList = (rawIIIF) => {
  const seeAlsoSchema = []
  rawIIIF.forEach(function (entry) {
    if ('seeAlso' in entry) {
      const seeAlso = entry.seeAlso
      seeAlso.forEach(function (eachSeeAlso) {
        if (eachSeeAlso.profile === 'https://schema.org/') {
          seeAlsoSchema.push(eachSeeAlso.id + '/manifest')
        }
      })
    }
  })
  return seeAlsoSchema
}
// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const rawIIIF = await loadIIIFData()
  const seeAlso = await getSchemaSeeAlsoList(rawIIIF)
  const manifestData = await fetchData(seeAlso)
  const data = JSON.stringify(manifestData)
  fs.writeFileSync(path.join(__dirname, '/../../site/content/json/iiif/seeAlso.json'), data)

  resolve()
})
