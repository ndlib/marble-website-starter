const fetch = require('node-fetch')
const md5 = require('md5')
const fs = require('fs')
const fetchData = require('./fetch')
const path = require(`path`)

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  { actions, getNode, getNodes, createNodeId, hasNodeChanged, store, cache, createContentDigest }
) => {
  const { createNode, touchNode } = actions
  touchNode
  let urlPromises = []

  const buildNode = (data) => {
    const node = data.manifest
    node.id = node['@id']
    node.children = (node.collections || node.manifests || []).map(manifest => manifest['@id'])

    delete node.collections
    delete node.manifests

    if (node['@type'].toLowerCase() === 'sc:collection') {
      node.slug = 'collection/' + md5(node['@id'])
    } else {
      node.slug = 'item/' + md5(node['@id'])
    }

    // downloadFiles(node, data.assets)

    const nodeContent = JSON.stringify(node)

    const nodeMeta = {
      id: node.id,
      parent: data.parent_id,
      internal: {
        type: 'iiifManifest',
        mediaType: `text/json`,
        content: nodeContent,
        contentDigest: createContentDigest(node),
      }
    }

    return Object.assign({}, node, nodeMeta)
  }

  const buildCategoryNode = (node) => {
    // create a foriegn key reference to the manifests
    node.manifests___NODE = node.manifest_ids
    delete node.manifest_ids

    // add a slug for the page creation
    node.slug = path.join('/browse/', node.id)

    // find the toplevel parent (the level right under root)

    const topLevelParentId = findTopLevelParentId(node)
    if (topLevelParentId) {
      node.topLevelParent___NODE = createNodeId(topLevelParentId)
    }

    // map any subCategories so that they can be searched as foreign keys
    node.subCategories___NODE = node.children.map(child => createNodeId(child))
    delete node.children

    // allow the direct parent to be searched
    if (node.parent_id) {
      node.parentCategory___NODE =  createNodeId(node.parent_id)
    }

    const nodeContent = JSON.stringify(node)

    const nodeMeta = {
      id: createNodeId(node.id),
      internal: {
        type: 'BrowseCategory',
        mediaType: `text/json`,
        content: nodeContent,
        contentDigest: createContentDigest(node),
      }
    }

    return Object.assign({}, node, nodeMeta)
  }

  const loadManifestsFile = () => {
    const contents = fs.readFileSync(path.join(__dirname, '/../../manifests.json'))
    return JSON.parse(contents)
  }

  const findTopLevelParentId = (node) => {
    if (node.id === 'root' || node.parent_id === 'root') {
      return null
    }

    const parentNode = manifestList.tags[node.parent_id]
    if (parentNode.parent_id === 'root') {
      return parentNode.id
    }

    return findTopLevelParentId(parentNode)
  }
/*
  const downloadFiles = async (node, urls) => {
    // node.localFiles___NODE = []
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
              // bar.tick()
              fileNodeID = fileNode.id

              await cache.set(remoteDataCacheKey, { fileNodeID })
            }
          } catch (err) {
            // Ignore
          }
        }

        if (fileNodeID) {
          // node.localFiles___NODE.push(fileNodeID)
        }

        return fileNodeID
      })
    )
    })
  }
*/

  const manifestList = loadManifestsFile()

  return new Promise(async (resolve, reject) => {
    for (const tagId in manifestList.tags) {
      const node = buildCategoryNode(manifestList.tags[tagId])
      await createNode(node)
    }

    const manifestData = await fetchData(manifestList.manifests.map( (manifest) => manifest.id))

    for (let key in manifestData) {
      let data = manifestData[key]
      const node = buildNode(data)
      await createNode(node)
    }

    resolve()
  })
}
