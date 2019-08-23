const fs = require('fs')
const path = require(`path`)
const { Client } = require('@elastic/elasticsearch')
const configuration = require('../../site/content/configuration.js')

const availbaleTags = [
  'ndlife',
  'notredame',
  'religiouspaintings',
  'historicalartifacts',
  'historicaljournals',
  'religiousartifacts',
  'science',
]
const continentTag = ['northamerica', 'europe', 'southamerica', 'asia', 'africa', 'austrailia']
const availableRepositories = ['Snite Museum of Art', 'University Archives', 'Rare Books and Special Collections Department']

const client = new Client({ node: 'https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com' })
const siteIndex = configuration.siteMetadata.searchBase.app

const indexMapping = {
  mapping: {
    _doc: {
      searchDate: {
        type: 'integer_range',
      },
      searchLocation: {
        type: 'geo_point',
      },
    },
  },
}

const loadManifestData = () => {
  const idReferencedObject = {}
  const data = fs.readFileSync(path.join(__dirname, '/../../site/content/json/iiif/iiif.json'))
  const manifestData = JSON.parse(data.toString())

  manifestData.forEach((manifest) => {
    idReferencedObject[manifest.id] = manifest
  })

  return idReferencedObject
}

const manifestIdsToIndex = () => {
  const contents = fs.readFileSync(path.join(__dirname, '/../../site/content/manifests.json'))
  return JSON.parse(contents).manifests
}

const determineCentury = (year) => {
  return parseInt(year / 100, 10) + 1
}

const getSearchDataFromManifest = (manifest) => {
  const identifier = manifest.id.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
  const date = Math.floor(1700 + Math.random() * 300)
  const centuryTag = determineCentury(date) + 'thcentury'
  console.log(centuryTag)
  const search = {
    id: manifest.id,
    name: manifest.label[configuration.siteMetadata.languages.default].join(),
    thumbnail: manifest.thumbnail[0].id,
    identifier: identifier,
    type: manifest.type,
    language: 'en',
    url: manifest.slug,
    place: 'South Bend',
    repository: availableRepositories[parseInt(Math.random() * availableRepositories.length, 10)],
    year: date,
    categoryTags: [centuryTag, availbaleTags[parseInt(Math.random() * availbaleTags.length, 10)], continentTag[parseInt(Math.random() * availbaleTags.length, 10)]],
    themeTag: [availbaleTags[parseInt(Math.random() * availbaleTags.length, 10)]],
    centuryTag: [centuryTag],
    continentTag: [continentTag[parseInt(Math.random() * availbaleTags.length, 10)]],
    modernCountryTag: [],
  }
  search['allMetadata'] = (manifest.summary) ? manifest.summary.en[0] : ''

  manifest.metadata.forEach((row) => {
    const label = row.label[configuration.siteMetadata.languages.default].join('').toLowerCase()
    const value = row.value[configuration.siteMetadata.languages.default].join('')

    search[label] = value
    search['allMetadata'] += ' ' + value
  })
  return search
}

const indexToElasticSearch = async (searchData) => {
  console.log('Indexing')
  // convert the data to bulk index format
  const indexData = []
  searchData.forEach((manifest) => {
    indexData.push({ index:  { _index: siteIndex, _type: '_doc', _id: manifest.id } })
    indexData.push(manifest)
  })

  await client.bulk({
    body: indexData,
  })
  console.log('Finished Index')
}

const setupIndex = async () => {
  const indexExists = await client.indices.exists({ index: siteIndex })
  if (indexExists.body) {
    console.log('removing index', siteIndex)
    await client.indices.delete({ index: siteIndex })
  }
  console.log('creating index', siteIndex)
  await client.indices.create({ index: siteIndex }, indexMapping)
}

const writeDirectory = path.join(__dirname, '/../../site/content/json/search/')

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const manifestIndex = loadManifestData()
  await setupIndex()

  const writeData = []
  manifestIdsToIndex().forEach((id) => {
    const manifest = manifestIndex[id]
    writeData.push(getSearchDataFromManifest(manifest))
  })

  await indexToElasticSearch(writeData)
  console.log('Writing Search Data to gatsby')
  fs.writeFileSync(path.join(writeDirectory, 'search.json'), JSON.stringify(writeData))

  resolve()
}).then(() => {
  console.log('done')
}).catch((e) => {
  console.log(e)
})
