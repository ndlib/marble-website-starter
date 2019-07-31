const fetch = require('node-fetch')
const configuration = require('../../content/configuration.js')

module.exports = async (urls) => {
  const result = {}

  const recursiveProcess = async (url) => {
    console.log('Fetching:', url)
    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        let children = []
        if (data.type.toLowerCase() === 'collection') {
          children = data.items.map(manifest => manifest.id)
        }

        const childRequests = children.map(url => {
          return recursiveProcess(url, data['id'])
        })

        const filename = data['id'].replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
        data['slug'] = filename
        result[data['id']] = {}
        result[data['id']] = data

        return Promise.all(childRequests)
      }).catch(err => console.log('fetch error', err))
  }

  const expandManifestTree = (manifest) => {
    console.log('Expanding', manifest.id)
    manifest.items = manifest.items.map((item) => {
      if (item.type.toLowerCase() === 'manifest') {
        return result[item.id]
      } else {
        return item
      }
    })

    return manifest
  }

  const requests = urls.map(url => {
    return recursiveProcess(url)
  })

  await Promise.all(requests)
  const manifestTree = []

  try {
    Object.keys(result).forEach(key => {
      const manifest = expandManifestTree(result[key])
      console.log(manifest)
      traverseAndFixData(manifest)

      manifestTree.push(manifest)
    })
  } catch (err) {
    console.log('fetch error', err)
  }

  return manifestTree
}

const traverseAndFixData = (o) => {
  for (const i in o) {
    if (objectIsLabelORValue(i, o[i])) {
      o[i] = fixLanguage(o[i])
    } else if (continueTraversing(o[i])) {
      // going one step down in the object tree!!
      traverseAndFixData(o[i])
    }
  }
}

const objectIsLabelORValue = (key, obj) => {
  return ((key === 'label' || key === 'value' || key === 'summary') && typeof (obj) === 'object')
}

const continueTraversing = (obj) => {
  return (obj !== null && typeof (obj) === 'object')
}

const fixLanguage = (data) => {
  if (!data) {
    return undefined
  }
  if (typeof (data) !== 'object') {
    if (!Array.isArray(data)) {
      data = [data]
    }
    const save = data
    data = { }
    data[configuration.languages.default] = save
  }

  const ret = {}
  configuration.languages.allowed.forEach((lang) => {
    if (data[lang]) {
      if (!Array.isArray(data[lang])) {
        data[lang] = [data[lang]]
      }
      ret[lang] = data[lang]
    } else {
      ret[lang] = ['']
    }
  })
  return ret
}
