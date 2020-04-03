const fs = require('fs')
const path = require(`path`)
const fetch = require('node-fetch')
const directory = process.argv.slice(2)[0]

const loadManifestsFile = () => {
  const contents = fs.readFileSync(path.join(__dirname, '/../../site/content/manifests.json'))
  return JSON.parse(contents)
}

const fetchData = async (seeAlso) => {
  const finalResult = []
  await Promise.all(seeAlso.map(item => {
    // console.log('Processing: ' + item)
    const url = 'https://presentation-iiif.library.nd.edu/' + item + '/nd'
    const result = fetch(url)
      .then(response => response.json())
      .then(data => {
        finalResult.push(data)
      })
      .catch(error => {
        console.error('fetch error: ', error)
        return error
      })
    return result
  }))
    .then(() => {
      fs.writeFileSync(path.join(directory, '/content/items/items.json'), JSON.stringify(finalResult))
    })
    .catch(error => {
      console.error('Promise error: ', error)
      return error
    })
  return finalResult
}

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const rawIds = await loadManifestsFile()
  const fetchResult = await fetchData(rawIds.manifest_ids)
  if (!fetchResult) {
    reject(fetchResult)
  }
  resolve()
})
