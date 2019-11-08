const fs = require('fs')
const path = require(`path`)
const fetch = require('node-fetch')

const loadIIIFData = () => {
  const contents = fs.readFileSync(path.join(__dirname, '/../../site/content/json/iiif/iiif.json'))
  return JSON.parse(contents)
}

const fetchData = async (seeAlso) => {
  const finalResult = []
  await Promise.all(seeAlso.map(item => {
    console.log('Processing: ' + item)
    return fetch(item)
      .then(response => response.json())
      .then(data => {
        finalResult.push(data)
      })
  })
  )
  console.log('Result: ' + finalResult)
  fs.writeFileSync(path.join(__dirname, '/../../site/content/json/schema/schema.json'), JSON.stringify(finalResult))
  return finalResult
}

const getSchemaSeeAlsoList = (rawIIIF) => {
  const seeAlsoSchema = []
  rawIIIF.forEach(function (entry) {
    if ('seeAlso' in entry) {
      const seeAlso = entry.seeAlso
      seeAlso.forEach(function (eachSeeAlso) {
        if (eachSeeAlso.profile === 'https://schema.org/') {
          console.log('Extracting: ' + eachSeeAlso.id)
          seeAlsoSchema.push(eachSeeAlso.id)
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
  await fetchData(seeAlso)
  resolve()
})
