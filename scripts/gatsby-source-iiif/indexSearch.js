const fs = require('fs')
const path = require(`path`)

const { Client } = require('elasticsearch')
const auth = require('http-aws-es')
const AWS = require('aws-sdk')
require('dotenv').config()

const directory = process.argv.slice(2)[0]
const configuration = require(path.join(directory, '/content/configuration.js'))
const siteIndex = configuration.siteMetadata.searchBase.app
const domain = configuration.siteMetadata.searchBase.url

if (!domain || !siteIndex || domain === 'travis-test-no-index' || siteIndex === 'travis-test-no-index') {
  console.log('Required parameters were not passed in')
  return
}

const options = {
  host: domain,
  port:443,
  protocol:'https',
  connectionClass: auth,
  awsConfig: new AWS.Config({ region: 'us-east-1' }),
}
const client = Client(options)

// save
// https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com
// website-test-index
// export SEARCH_INDEX=website-test-index
// export SEARCH_URL=https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com

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

const determineProvider = (manifest) => {
  // snite repositories
  if (['museum', 'snite'].includes(manifest.repository.toLowerCase())) {
    return 'Snite Museum of Art'
  }

  if (['unda'].includes(manifest.repository.toLowerCase())) {
    return 'University Archives'
  }

  return 'Rare Books and Special Collections'
}

const getNumberWithOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

const getCenturyTags = (dates) => {
  if (!dates) {
    return ['undated']
  }
  const mappedDates = dates.match(/([0-9]{4})/g)
  if (!mappedDates) {
    console.error('date not mapped', dates)
    return ['undated']
  }

  let years = dates.match(/([0-9]{4})/g).map((year) => {
    year = Math.ceil(year / 100)
    return getNumberWithOrdinal(year) + ' Century'
  })
  if (years.length === 0) {
    years = ['undated']
  }

  return years
}

const indexSettings = {
  settings: {
    number_of_shards: 1,
    number_of_replicas: 1,
  },
}

const loadManifestData = () => {
  const data = fs.readFileSync(path.join(directory, '/content/json/items/items.json'))
  const manifestData = JSON.parse(data.toString())
  return manifestData
}

const themeFromSubjectTags = (manifest) => {
  if (!manifest.subjects) {
    return []
  }
  const subjects = JSON.parse(manifest.subjects.replace(/'/g, '"'))
  return subjects.map(m => {
    return m.term
  })
}

const loadSubItemTitles = (manifest) => {
  return manifest.items.reduce((titles, item) => {
    if (item.title) {
      return titles + ' ' + item.title
    }
    return titles
  }, '')
}

const allMetadataKeys = [
  'title', 'creator', 'description', 'collectionId', 'id', 'uniqueIdentifier', 'dimensions',
  'language', 'license', 'access', 'format', 'dedication', 'medium', 'classification', 'workType',
]

const getSearchDataFromManifest = (manifest) => {
  const search = {
    id: manifest.iiifUri,
    name: manifest.title,
    creator: manifest.creator,
    date: manifest.dateCreated,
    identifier: manifest.uniqueIdentifier,
    type: manifest.level,
    url: '/item/' + manifest.id,
    repository: determineProvider(manifest),
    themeTag: themeFromSubjectTags(manifest),
    centuryTag: getCenturyTags(manifest.dateCreated),
  }

  if (manifest.workType) {
    search['formatTag'] = [manifest.workType]
  }

  allMetadataKeys.forEach((key) => {
    if (manifest[key]) {
      search['allMetadata'] += ' ' + manifest[key]
    }
  })
  search['allMetadata'] += ' ' + loadSubItemTitles(manifest)
  search['allMetadata'] += ' ' + search.repository
  search['allMetadata'] += ' ' + search.centuryTag.join(' ')
  search['allMetadata'] += ' ' + search.themeTag.join(' ')

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
  if (indexExists) {
    console.log('removing index', siteIndex)
    await client.indices.delete({ index: siteIndex })
  }
  console.log('creating index', siteIndex)
  // await client.indices.create({ index: siteIndex }, indexMapping, indexSettings)
  await client.indices.create({ index: siteIndex }).catch((e) => {
    console.log(e)
  })
}

const writeDirectory = path.join(directory, '/content/json/search/')

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const manifests = loadManifestData()
  await setupIndex()

  const writeData = []
  manifests.forEach((manifest) => {
    if (manifest) {
      writeData.push(getSearchDataFromManifest(manifest))
    }
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
