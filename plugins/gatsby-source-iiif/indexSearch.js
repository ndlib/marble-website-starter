const fs = require('fs')
const path = require(`path`)
const { Client } = require('@elastic/elasticsearch')
const configuration = require('../../content/configuration.js')

const availbaleTags = ['art', 'journals', 'sports', 'catholic stuff']

const client = new Client({ node: 'https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com' })
const siteIndex = configuration.siteMetadata.searchBase.app

const loadManifestsFile = () => {
  const contents = fs.readFileSync(path.join(__dirname, '/../../content/manifests.json'))
  return JSON.parse(contents).manifests
}

const getSearchDataFromManifest = (identifier, manifest) => {
  const search = {
    id: manifest.id,
    name: manifest.label[configuration.siteMetadata.languages.default],
    thumbnail: manifest.thumbnail[0].id,
    identifier: identifier,
    type: manifest.type,
    language: 'en',
    place: 'South Bend',
    repository: 'SNITE',
    year: Math.floor(1900 + Math.random() * 100),
    url: manifest.slug,
    tag: [availbaleTags[parseInt(Math.random() * availbaleTags.length, 10)]],
  }

  manifest.metadata.forEach((row) => {
    const label = row.label[configuration.siteMetadata.languages.default].join('').toLowerCase()
    const value = row.value[configuration.siteMetadata.languages.default].join('')

    search[label] = value
  })

  return search
}

const indexToElasticSearch = async (identifier, searchData) => {
  console.log('Indexing', identifier)

  await client.index({
    index: siteIndex,
    type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    id: searchData.id,
    body: searchData,
  })
  console.log('finished', identifier)
}

const writeDirectory = path.join(__dirname, '/../../content/json/search/')

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const data = fs.readFileSync(path.join(__dirname, '/../../content/json/iiif/iiif.json'))
  const manifestData = JSON.parse(data.toString())

  console.log('removing current index')
  await client.indices.delete({ index: siteIndex })

  let searchData = []
  searchData = []
  manifestData.forEach((manifest) => {
    const identifier = manifest.id.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
    // const manifestString = fs.readFileSync(path.join(__dirname, '/../../content/json/iiif/' + identifier + '.json'), { encoding: 'utf8' })
    // const manifest = JSON.parse(manifestString)
    searchData.push(getSearchDataFromManifest(identifier, manifest))

    indexToElasticSearch(identifier, searchData)
  })

  fs.writeFileSync(path.join(writeDirectory, 'search.json'), JSON.stringify(searchData))
  resolve()
}).then(() => {
  console.log('done')
})
