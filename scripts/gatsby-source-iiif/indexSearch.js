const fs = require('fs')
const path = require(`path`)
const { Client } = require('elasticsearch')
const auth = require('http-aws-es')
const AWS = require('aws-sdk')
require('dotenv').config()
const configuration = require('../../site/content/configuration.js')

const siteIndex = process.env.SEARCH_INDEX
const domain = process.env.SEARCH_URL
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

const archives = ['CSOR-04-05-01', 'GNDL-45-01', 'CEDW-30-16-01', 'GNDL-45-02', 'CEDW-20-02-08', 'nd-life', 'GNDL-45-04', 'CTAO-01-28', 'GNDL-45-05']
const determineProvider = (manifest) => {
  if (manifest.id.match(/\/[0-9]{4}[.](.*)\/manifest$/)) {
    return 'Snite Museum of Art'
  }

  const res = archives.find((testId) => {
    if (manifest.id.includes(testId)) {
      return true
    }
    return false
  })
  if (res) {
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
  let years = dates.match(/([0-9]{4})/g).map((year) => {
    year = Math.ceil(year / 100)
    return getNumberWithOrdinal(year) + 'Century'
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

const loadCategories = () => {
  const objectsByTagTypeAndId = {}
  const data = fs.readFileSync(path.join(__dirname, '/../../site/content/categories.json'))
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

const getCreator = (metadata) => {
  const options = ['creator']
  return metadata.reduce((creator, row) => {
    const label = row.label[configuration.siteMetadata.languages.default].join('').toLowerCase()

    if (options.includes(label)) {
      console.log(row.value[configuration.siteMetadata.languages.default])
      return creator.concat(row.value[configuration.siteMetadata.languages.default].join(''))
    }

    return creator
  }, [])
}

const themeFromSubjectTags = (metadata) => {
  const options = ['subjects']
  const subjects = metadata.reduce((creator, row) => {
    const label = row.label[configuration.siteMetadata.languages.default].join('').toLowerCase()

    if (options.includes(label)) {
      console.log(row.value[configuration.siteMetadata.languages.default])
      return creator.concat(row.value[configuration.siteMetadata.languages.default].join(''))
    }

    return creator
  }, [])
  console.log(subjects)
}

const objectsByTagTypeAndId = loadCategories()

const getSearchDataFromManifest = (manifest) => {
  const identifier = manifest.id.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
  const date = Math.floor(1200 + Math.random() * 700)

  const tagId = manifest.id.replace('https://presentation-iiif.library.nd.edu/', '')
  const search = {
    id: manifest.id,
    name: manifest.label[configuration.siteMetadata.languages.default].join(),
    creator: getCreator(manifest.metadata),
    thumbnail: (manifest.thumbnail && manifest.thumbnail[0]) ? manifest.thumbnail[0].id : '',
    identifier: identifier,
    type: manifest.type,
    language: 'en',
    url: manifest.slug,
    repository: determineProvider(manifest),
    year: date,
    themeTag: objectsByTagTypeAndId['themeTag.keyword'][tagId],
    centuryTag: getCenturyTags(date.toString()),
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
  // await client.indices.create({ index: siteIndex }, indexMapping, indexSettings)
  await client.indices.create({ index: siteIndex }).catch((e) => {
    console.log(e)
  })
}

const writeDirectory = path.join(__dirname, '/../../site/content/json/search/')

// eslint-disable-next-line
new Promise(async (resolve, reject) => {
  const manifestIndex = loadManifestData()
  await setupIndex()
  console.log('write')
  const writeData = []
  manifestIdsToIndex().forEach((id) => {
    const manifest = manifestIndex[id]
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
