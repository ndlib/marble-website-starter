

const fetch = require("node-fetch")

module.exports = async (urls) => {
  let result = {}

  const recursiveProcess = async (url, parent_id) => {
    return fetch(url)
        .then(response => response.json())
        .then((data) => {
          let children = (data.collections || data.manifests || []).map(manifest => manifest['@id'])

          result[data['@id']] = {}
          result[data['@id']]['manifest'] = data
          result[data['@id']]['parent_id'] = parent_id
          result[data['@id']]['assets'] = searchForAssets(data)
          //console.log(result[data['@id']]['assets'])
          let childRequests = children.map(url => {
            return recursiveProcess(url, data['@id'])
          })
          return Promise.all(childRequests)
        })
  }

  requests = urls.map( url => {
    return recursiveProcess(url)
  })
  await Promise.all(requests)

  return result
}

const recursiveSearchKeys = ['collections', 'manifests', 'sequences', 'canvases', 'images']

const searchForAssets = (node) => {
  let assets = []
  for (let key in node) {
    if (key.toLowerCase() == 'resource') {
      assets.push(node[key]['service']['@id'])
    }
    if (recursiveSearchKeys.includes(key.toLowerCase())) {
      node[key].map( searchNode => {
        assets = assets.concat(searchForAssets(searchNode))
      })
    }
  }
  return assets
}
