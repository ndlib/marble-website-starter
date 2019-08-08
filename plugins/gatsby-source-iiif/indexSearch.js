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
    name: manifest.label[configuration.siteMetadata.languages.default],
    thumbnail: manifest.thumbnail[0].id,
    identifier: identifier,
    type: manifest.type,
    language: 'en',
    place: 'South Bend',
    repository: 'SNITE',
    year: 1900 + Math.random() * 100,
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
    body: searchData,
  })
  console.log('finished', identifier)
}

const writeDirectory = path.join(__dirname, '/../../content/search/iiif/')

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const manifestList = loadManifestsFile()
  console.log('removing current index')
  await client.indices.delete({ index: siteIndex })

  manifestList.forEach((manifestUrl) => {
    const identifier = manifestUrl.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
    const manifestString = fs.readFileSync(path.join(__dirname, '/../../content/iiif/' + identifier + '.json'), { encoding: 'utf8' })
    const manifest = JSON.parse(manifestString)
    const searchData = getSearchDataFromManifest(identifier, manifest)

    indexToElasticSearch(identifier, searchData)
    fs.writeFileSync(path.join(writeDirectory, identifier + '.json'), JSON.stringify(searchData))
  })

  resolve()
}).then(() => {
  console.log('done')
})
