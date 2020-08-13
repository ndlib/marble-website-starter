const fs = require('fs')
const path = require(`path`)

const { Client } = require('elasticsearch')
const auth = require('http-aws-es')
const AWS = require('aws-sdk')
const realDatesFromCatalogedDates = require('./src/realDatesFromCatalogedDates')
const getKeywordsFromSubjects = require('./src/getKeywordsFromSubjects')
const getCreators = require('./src/getCreators')

const appConfig = process.env.APP_CONFIG
if (appConfig === 'local' || process.env.TRAVIS_RUN) {
  return
}

const directory = process.argv.slice(2)[0]
require('dotenv').config({
  path: path.join(directory, '.env.development'),
})
const siteIndex = process.env.SEARCH_INDEX
const domain = process.env.SEARCH_URL

if (!domain || !siteIndex) {
  console.log('Required parameters were not passed in')
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

const determineProvider = (manifest) => {
  // snite repositories
  if (['museum', 'snite'].includes(manifest.repository.toLowerCase())) {
    return 'Snite Museum of Art'
  }

  if (['unda'].includes(manifest.repository.toLowerCase())) {
    return 'University Archives'
  }

  if (['hesb'].includes(manifest.repository.toLowerCase())) {
    return 'General Collection, Hesburgh Libraries'
  }

  return 'Rare Books and Special Collections'
}

const loadManifestData = () => {
  const data = fs.readFileSync(path.join(directory, '/content/items/items.json'))
  const manifestData = JSON.parse(data.toString())
  return manifestData
}

const loadSubItemTitles = (manifest) => {
  if (!manifest.items) {
    return ''
  }

  return manifest.items.reduce((titles, item) => {
    if (item.title) {
      return titles + '::' + item.title
    }
    return titles
  }, '')
}

const allMetadataKeys = [
  'description', 'collectionId', 'id', 'uniqueIdentifier', 'dimensions',
  'language', 'license', 'access', 'format', 'dedication', 'medium', 'classification', 'workType',
]

const getSearchDataFromManifest = (manifest) => {
  const dateData = realDatesFromCatalogedDates(manifest.createdDate)
  const creators = getCreators(manifest.creators)
  const search = {
    id: manifest.iiifUri,
    name: manifest.title,
    creator: creators,
    date: manifest.createdDate,
    lowestSearchRange: dateData.undated ? 500000 : dateData.lowestSearchRange,
    highestSearchRange: dateData.undated ? 500000 : dateData.highestSearchRange,
    identifier: manifest.uniqueIdentifier,
    thumbnail: manifest.iiifImageUri,
    type: manifest.level,
    url: '/item/' + manifest.id,
    repository: determineProvider(manifest),
    themeTag: getKeywordsFromSubjects(manifest),
    centuryTag: dateData.centuryTags,
  }
  if (manifest.workType) {
    search['formatTag'] = [manifest.workType]
  }

  search['allMetadata'] = ''
  search['allMetadata'] = creators.join('::')
  allMetadataKeys.forEach((key) => {
    if (manifest[key]) {
      search['allMetadata'] += '::' + manifest[key]
    }
  })
  search['allMetadata'] += '::' + loadSubItemTitles(manifest)
  search['allMetadata'] += '::' + search.repository
  search['allMetadata'] += '::' + search.centuryTag.join('::')
  search['allMetadata'] += '::' + search.themeTag.join('::')

  return search
}

const indexToElasticSearch = async (searchData) => {
  console.log('Indexing')
  // convert the data to bulk index format
  const body = []
  searchData.forEach((manifest) => {
    body.push({ index:  { _index: siteIndex, _type: '_doc', _id: manifest.id } })
    body.push(manifest)
  })

  const bulkResponse = await client.bulk({ refresh: true, body })
  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1],
        })
      }
    })
    console.log('error documents', erroredDocuments)
  }

  console.log('Finished Index')
}

const setupIndex = async () => {
  const indexExists = await client.indices.exists({ index: siteIndex })
  if (indexExists) {
    console.log('removing index' + siteIndex)
    await client.indices.delete({ index: siteIndex })
  }

  const node = {}
  node.settings = await configIndexSettings()
  node.mappings = await configIndexMappings()
  const index = { index: siteIndex, body: node }

  console.log('creating index ' + siteIndex)
  console.log('index properties ' + JSON.stringify(index))
  await client.indices.create(index).catch((e) => {
    console.log(e)
  })
}

const configIndexSettings = async () => {
  const settings = {
    index: {
      number_of_shards: 1,
    },
    analysis: {
      analyzer: {
        stopword_analyzer: {
          type: 'standard',
          stopwords: '_english_',
        },
      },
    },
  }
  let nodeInfo = await client.cluster.health().catch((e) => {
    console.log(e)
    nodeInfo = { number_of_nodes: 1 }
  })
  if (nodeInfo['number_of_nodes'] > 1) {
    settings.index['number_of_replicas'] = 1
  } else {
    settings.index['number_of_replicas'] = 0
  }
  return settings
}

const configIndexMappings = async () => {
  const mappings = {
    properties : {
      allMetadata : {
        type: 'text',
        analyzer: 'stopword_analyzer',
      },
      date: {
        type: 'text',
      },
    },
  }

  return mappings
}

const writeDirectory = path.join(directory, '/content/search/')

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const manifests = loadManifestData()
  const writeData = []
  manifests.forEach((manifest) => {
    if (manifest) {
      writeData.push(getSearchDataFromManifest(manifest))
    }
  })

  await setupIndex()
  await indexToElasticSearch(writeData)
  console.log('Writing Search Data to gatsby')
  fs.writeFileSync(path.join(writeDirectory, 'search.json'), JSON.stringify(writeData))

  resolve()
}).then(() => {
  console.log('done')
}).catch((e) => {
  console.log(e)
})
