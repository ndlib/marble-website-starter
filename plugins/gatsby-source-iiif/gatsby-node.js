const fetch = require("node-fetch")
const md5 = require("md5")
const fs = require("fs")
const fetchData = require('./fetch')

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  { actions, getNode, getNodes, createNodeId, hasNodeChanged, store, cache, createContentDigest },
  configOptions
) => {
  const { createNode, touchNode } = actions
  let urlPromises = []

  const buildNode = (data) => {
    let node = data.manifest
    node.id = node["@id"]
    node.children = (node.collections || node.manifests || []).map(manifest => manifest['@id'])

    delete node.collections
    delete node.manifests

    if (node['@type'].toLowerCase() === 'sc:collection') {
      node.slug = "collection/" + md5(node["@id"])
    } else {
      node.slug = "item/" + md5(node["@id"])
    }

    if (manifest2Tags[node['@id']]) {
      node.tags = manifest2Tags[node['@id']].tags
    } else {
      node.tags = []
    }

    // downloadFiles(node, data.assets)

    const nodeContent = JSON.stringify(node)

    const nodeMeta = {
      id: node.id,
      parent: data.parent_id,
      internal: {
        type: "iiifManifest",
        mediaType: `text/json`,
        content: nodeContent,
        contentDigest: createContentDigest(node)
      }
    }

    return Object.assign({}, node, nodeMeta)
  }

  const buildCategoryNode = (node) => {
    const nodeContent = JSON.stringify(node)

    const nodeMeta = {
      id: node.id,
      parent: node.parent_id,
      internal: {
        type: "BrowseCategory",
        mediaType: `text/json`,
        content: nodeContent,
        contentDigest: createContentDigest(node)
      }
    }

    return Object.assign({}, node, nodeMeta)

  }

  const loadManifestsFile = () => {
    const contents = fs.readFileSync(__dirname + "/../../manifests.json")
    return JSON.parse(contents)
  }

  const downloadFiles = async (node, urls) => {
    //node.localFiles___NODE = []
    // chunk the requests becase iiif servers are slow
    let chunkedUrls = []
    let i,j,chunk = 1;
    for (i=0,j=urls.length; i<j; i+=chunk) {
      chunkedUrls.push(urls.slice(i,i+chunk))
    }

    chunkedUrls.map(async (set) => {
    await Promise.all(
      set.map(async url => {
        let fileNodeID
        const remoteDataCacheKey = `iiif-asset-${url}`
        const cacheRemoteData = await cache.get(remoteDataCacheKey)

        // Avoid downloading the asset again if it's been cached
        // Note: Contentful Assets do not provide useful metadata
        // to compare a modified asset to a cached version?
        if (cacheRemoteData) {
          fileNodeID = cacheRemoteData.fileNodeID // eslint-disable-line prefer-destructuring
          touchNode({ nodeId: cacheRemoteData.fileNodeID })
        }

        // If we don't have cached data, download the file
        if (!fileNodeID) {
          try {
            const fileNode = await createRemoteFileNode({
              url,
              store,
              cache,
              createNode,
              createNodeId,
            })

            if (fileNode) {
              //bar.tick()
              fileNodeID = fileNode.id

              await cache.set(remoteDataCacheKey, { fileNodeID })
            }
          } catch (err) {
            // Ignore
          }
        }

        if (fileNodeID) {
          //node.localFiles___NODE.push(fileNodeID)
        }

        return fileNodeID
      })
    )
    })
  }
  let manifestList = loadManifestsFile()
  let manifest2Tags = {}
  manifestList.manifests.map ( (manifest) => {
    manifest2Tags[manifest.id] = manifest
  })



  return new Promise(async (resolve, reject) => {
    for (let tag_id in manifestList.tags) {
      let node = buildCategoryNode(manifestList.tags[tag_id])
      await createNode(node)
    }

    let manifestData = await fetchData(manifestList.manifests.map( (manifest) => manifest.id))

    for (let key in manifestData) {
      let data = manifestData[key]
      let node = buildNode(data)
      await createNode(node)
    }

    resolve()
  })
}
