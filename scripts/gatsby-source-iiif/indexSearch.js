const fs = require('fs')
const path = require(`path`)

const { Client } = require('elasticsearch')
const auth = require('http-aws-es')
const AWS = require('aws-sdk')
require('dotenv').config()

const availableRepositories = ['Snite Museum of Art', 'University Archives', 'Rare Books and Special Collections Department']

const siteIndex = process.env.SEARCH_INDEX
const domain = process.env.SEARCH_URL
if (!domain || !siteIndex) {
  console.log('Required parameters were not passed in')
  return
}

const configuration = require(path.join(domain, '/content/configuration.js'))
const options = {
  host: domain,
  port:443,
  protocol:'https',
  connectionClass: auth,
  awsConfig: new AWS.Config({ region: 'us-east-1' }),
}
const client = Client(options)

const indexMapping = {
  mappings: {
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

const indexSettings = {
  settings: {
    number_of_shards: 1,
    number_of_replicas: 1,
  },
}

const loadManifestData = () => {
  const idReferencedObject = {}
  const data = fs.readFileSync(path.join(domain, '/content/json/iiif/iiif.json'))
  const manifestData = JSON.parse(data.toString())

  manifestData.forEach((manifest) => {
    idReferencedObject[manifest.id] = manifest
  })

  return idReferencedObject
}

const manifestIdsToIndex = () => {
  const contents = fs.readFileSync(path.join(domain, '/content/manifests.json'))
  return JSON.parse(contents).manifests
}

const loadCategories = () => {
  const objectsByTagTypeAndId = {}
  const data = fs.readFileSync(path.join(domain, '/content/categories.json'))
  const categories = JSON.parse(data)
  categories.forEach((row) => {
    if (!row.tagField) {
      return
    }
    if (!objectsByTagTypeAndId[row.tagField]) {
      objectsByTagTypeAndId[row.tagField] = {}
    }
    if (row.manifest_ids) {
      row.manifest_ids.forEach((manifestId) => {
        if (!objectsByTagTypeAndId[row.tagField][manifestId]) {
          objectsByTagTypeAndId[row.tagField][manifestId] = []
        }
        objectsByTagTypeAndId[row.tagField][manifestId].push(row.label)
      })
    }
  })
  return objectsByTagTypeAndId
}

const objectsByTagTypeAndId = loadCategories()

const getSearchDataFromManifest = (manifest) => {
  const identifier = manifest.id.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
  const date = Math.floor(1700 + Math.random() * 300)

  const tagId = manifest.id.replace('https://presentation-iiif.library.nd.edu/', '')
  const search = {
    id: manifest.id,
    name: manifest.label[configuration.siteMetadata.languages.default].join(),
    thumbnail: manifest.thumbnail[0].id,
    identifier: identifier,
    type: manifest.type,
    // language: 'en',
    url: manifest.slug,
    place: 'South Bend',
    repository: availableRepositories[parseInt(Math.random() * availableRepositories.length, 10)],
    year: date,
    themeTag: objectsByTagTypeAndId['themeTag.keyword'][tagId],
    centuryTag: objectsByTagTypeAndId['centuryTag.keyword'][tagId],
    // continentTag: objectsByTagTypeAndId['continentTag.keyword'][tagId],
    formatTag: objectsByTagTypeAndId['formatTag.keyword'][tagId],
  }
  search['allMetadata'] = (manifest.summary) ? manifest.summary.en[0] : ''

  manifest.metadata.forEach((row) => {
    const label = row.label[configuration.siteMetadata.languages.default].join('').toLowerCase()
    const value = row.value[configuration.siteMetadata.languages.default].join('')

    if (!search[label]) {
      search[label] = value
    }
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
  await client.indices.create({ index: siteIndex }, indexMapping, indexSettings)
  // await client.indices.create({ index: siteIndex }).catch((e) => {
  //   console.log(e)
  // })
}

const writeDirectory = path.join(domain, '/content/json/search/')

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
