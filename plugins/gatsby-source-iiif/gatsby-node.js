
const fetch = require("node-fetch")
const md5 = require("md5")

const fetchData = require('./fetch')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest  }, configOptions) => {
  const { createNode } = actions
  let urlPromises = []

  const buildNode = (node, parent_id) => {
    node.id = node["@id"]
    node.children = (node.collections || node.manifests || []).map(manifest => manifest['@id'])

    delete node.collections
    delete node.manifests

    if (node['@type'].toLowerCase() === 'sc:collection') {
      node.slug = "collection/" + md5(node["@id"])
    } else {
      node.slug = "item/" + md5(node["@id"])
    }

    const nodeContent = JSON.stringify(node)

    const nodeMeta = {
      id: node.id,
      parent: parent_id,
      internal: {
        type: "iiifManifest",
        mediaType: `text/json`,
        content: nodeContent,
        contentDigest: createContentDigest(node)
      }
    }

    return Object.assign({}, node, nodeMeta)
  }

  return new Promise(async (resolve, reject) => {
    let manifestData = await fetchData(configOptions.manifests)

    for (let key in manifestData) {
      let data = manifestData[key]
      let node = buildNode(data.manifest, data.parent_id)
      createNode(node)
    }

    resolve()
  })
}
