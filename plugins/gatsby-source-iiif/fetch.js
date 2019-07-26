
const fetch = require('node-fetch')

module.exports = async (urls) => {
  const result = {}

  const recursiveProcess = async (url, parent_id) => {
    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        const children = (data.collections || data.manifests || []).map(manifest => manifest['id'])

        result[data['id']] = {}
        result[data['id']]['manifest'] = data
        result[data['id']]['parent_id'] = parent_id
        result[data['id']]['assets'] = searchForAssets(data)
        const childRequests = children.map(url => {
          return recursiveProcess(url, data['id'])
        })
        return Promise.all(childRequests)
      }).catch(err => console.log('fetch error', url))
  }

  requests = urls.map(url => {
    return recursiveProcess(url)
  })
  await Promise.all(requests)

  return result
}

const recursiveSearchKeys = ['collections', 'manifests', 'sequences', 'canvases', 'images', 'items']

const searchForAssets = (node) => {
  let assets = []
  for (const key in node) {
    if (key.toLowerCase() == 'resource') {
      assets.push(node[key]['service']['id'])
    }
    if (recursiveSearchKeys.includes(key.toLowerCase())) {
      node[key].map(searchNode => {
        assets = assets.concat(searchForAssets(searchNode))
      })
    }
  }
  return assets
}
