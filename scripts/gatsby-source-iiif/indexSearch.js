const fs = require('fs')
const path = require(`path`)

const { Client } = require('elasticsearch')
const auth = require('http-aws-es')
const AWS = require('aws-sdk')
const realDatesFromCatalogedDates = require('./src/realDatesFromCatalogedDates')
const getKeywordsFromSubjects = require('./src/getKeywordsFromSubjects')
const getCreators = require('./src/getCreators')
const getLanguages = require('./src/getLanguages')
const findThumbnail = require('./src/findThumbnail')
const recursiveSearchIds = ['BPP1001_EAD']

const appConfig = process.env.APP_CONFIG
if (appConfig === 'local' || process.env.TRAVIS_RUN) {
  return
}

const getCollection = (collection) => {
  if (collection) {
    return collection.map((c) => c.display)
  }
  return []
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

  return 'Rare Books & Special Collections'
}

const loadManifestData = () => {
  // const data = fs.readFileSync(path.join(directory, '/content/items/items.json'))
  // const manifestData = JSON.parse(data.toString())

  const allManifestData = []

  const fileObjs = fs.readdirSync(path.join(directory, '/content/json/nd'))

  fileObjs.forEach(file => {
    if (!file.match(/^[.]/)) {
      const data = fs.readFileSync(path.join(directory, '/content/json/nd', file))
      const manifestData = JSON.parse(data.toString())

      allManifestData.push(manifestData)
    }
  })

  return allManifestData
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
  'description', 'dimensions', 'language', 'license', 'access', 'format', 'dedication', 'medium', 'classification', 'workType',
]

const getIdentifiers = (manifest) => {
  const ret = []
  if (manifest.uniqueIdentifier) {
    ret.push(manifest.uniqueIdentifier)
  }
  if (manifest.sourceSystem.toLowerCase() === 'aleph') {
    ret.push(manifest.id)
  }

  return ret
}

const getSearchDataFromManifest = (manifest) => {
  const dateData = realDatesFromCatalogedDates(manifest.createdDate)
  const creators = getCreators(manifest)
  const themes = getKeywordsFromSubjects(manifest)

  const search = {
    id: manifest.id,
    name: manifest.title,
    creator: creators,
    collection: getCollection(manifest.collections),
    identifier: getIdentifiers(manifest),

    repository: determineProvider(manifest),
    themeTag: themes.themeTag,
    expandedThemeTag: themes.expandedThemeTag,
    centuryTag: dateData.centuryTags,

    date: manifest.createdDate,
    lowestSearchRange: dateData.undated ? 500000 : dateData.lowestSearchRange,
    highestSearchRange: dateData.undated ? 500000 : dateData.highestSearchRange,
    workType: [manifest.workType],
    thumbnail: findThumbnail(manifest),
    language: getLanguages(manifest),
    type: manifest.level,
    url: '/item/' + manifest.id,
  }

  if (manifest.workType) {
    search['formatTag'] = [manifest.workType]
  }

  search['allMetadata'] = ''
  allMetadataKeys.forEach((key) => {
    if (manifest[key]) {
      search['allMetadata'] += '::' + manifest[key]
    }
  })
  search['allMetadata'] += '::' + loadSubItemTitles(manifest)
  search['allMetadata'] += '::' + search.centuryTag.join('::')
  search['allMetadata'] += '::' + search.themeTag.join('::')
  search['allMetadata'] += '::' + search.expandedThemeTag.join('::')

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
      filter: {
        english_stop: {
          type:       'stop',
          stopwords:  '_english_',
        },
      },
      char_filter: {
        // this is used for the id filters people do not always know the punctuation
        // in the id and sometimes do not know the leading zeros
        // we are removing all the characters people do not always know for the test.
        specialCharactersFilter: {
          pattern: '[^A-Za-z1-9]',
          type: 'pattern_replace',
          replacement: '',
        },
      },
      analyzer: {
        folded_analyzer: {
          tokenizer: 'standard',
          stopwords: '_english_',
          filter: [
            'lowercase',
            'asciifolding',
            'stemmer',
            'english_stop',
          ],
        },
        stopword_analyzer: {
          tokenizer: 'standard',
          filter: [
            'english_stop',
            'stemmer',
          ],
        },
        no_punctuation_keyword: {
          tokenizer: 'keyword',
          char_filter: [
            'specialCharactersFilter',
          ],
          filter: [
            'lowercase',
            'trim',
          ],
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
        fields: {
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      name: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256,
          },
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      creator: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256,
          },
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      collection: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256,
          },
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      identifier: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          idMatch: {
            type: 'text',
            analyzer: 'no_punctuation_keyword',
          },
        },
      },
      date: {
        type: 'text',
      },
    },
  }

  return mappings
}

const recursiveSearchDataFromManifest = (manifest) => {
  const ret = []
  manifest.items.forEach(item => {
    if (item.level !== 'file') {
      console.log('recur', manifest.id)
      ret.push(getSearchDataFromManifest(item))
      ret.concat(recursiveSearchDataFromManifest(item))
    }
  })
  return ret
}

const writeDirectory = path.join(directory, '/content/search/')

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const manifests = loadManifestData()
  const writeData = []
  manifests.forEach((manifest) => {
    if (manifest) {
      writeData.push(getSearchDataFromManifest(manifest))
      if (manifest.hierarchySearchable || recursiveSearchIds.includes(manifest.id)) {
        console.log('Manifest', manifest.title)
        recursiveSearchDataFromManifest(manifest)
      }
    }
  })

  //  await setupIndex()
  //  await indexToElasticSearch(writeData)
  console.log('Writing Search Data to gatsby')
  fs.writeFileSync(path.join(writeDirectory, 'search.json'), JSON.stringify(writeData))

  resolve()
}).then(() => {
  console.log('done')
}).catch((e) => {
  console.log(e)
})
