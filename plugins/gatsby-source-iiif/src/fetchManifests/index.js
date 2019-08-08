const fetch = require('node-fetch')
const traverseAndFixData = require('./fixIiifJson')
const md5 = require('md5')

module.exports = async (urls) => {
  const result = {}

  const recursiveFetchManifest = async (url, parentId) => {
    if (!url) {
      return
    }
    console.log('Fetching:', url)
    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        data['parentId'] = parentId
        data['slug'] = getFilenameFromId(data['id'])

        result[data['id']] = {}
        result[data['id']] = data

        return recursiveFetchChildren(data)
      }).catch(err => console.log('fetch error', url, err))
  }

  const getFilenameFromId = (id) => {
    const newId = id.replace(/http[s]?:\/\/.*?\//, '').replace('/manifest', '').replace('collection/', '')
    if (id.includes('manifest')) {
      return 'item/' + newId
    } else {
      return 'collection/' + newId
    }
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
