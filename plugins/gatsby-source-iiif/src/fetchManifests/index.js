const fetch = require('node-fetch')
const traverseAndFixData = require('./fixIiifJson')

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
      traverseAndFixData(manifest)

      manifestTree.push(manifest)
    })
  } catch (err) {
    console.log('fetch error', err)
  }

  return manifestTree
}
