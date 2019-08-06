const fetch = require('node-fetch')
const traverseAndFixData = require('./fixIiifJson')

module.exports = async (urls) => {
  const result = {}

  const recursiveFetchManifest = async (url, parentId) => {
    console.log('Fetching:', url)
    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        data['parentId'] = parentId
        data['slug'] = getFilenameFromId(data['id'])

        result[data['id']] = {}
        result[data['id']] = data

        return recursiveFetchChildren(data)
      }).catch(err => console.log('fetch error', err))
  }

  const getFilenameFromId = (id) => {
    return id.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
  }

  const recursiveFetchChildren = (manifest) => {
    let children = []
    if (manifest.type.toLowerCase() === 'collection') {
      children = manifest.items.map(manifest => manifest.id)
    }

    return Promise.all(children.map(url => {
      return recursiveFetchManifest(url, manifest['id'])
    }))
  }

  const expandManifestTree = (manifest) => {
    console.log('Expanding:', manifest.id)
    manifest.items = manifest.items.map((item) => {
      if (item.type.toLowerCase() === 'manifest') {
        return result[item.id]
      } else {
        return item
      }
    })

    return manifest
  }

  await Promise.all(urls.map(url => {
    return recursiveFetchManifest(url)
  }))

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
