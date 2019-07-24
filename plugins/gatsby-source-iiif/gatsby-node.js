const fetch = require('node-fetch')
const md5 = require('md5')
const fs = require('fs')
const fetchData = require('./fetch')
const path = require(`path`)

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  { actions, getNode, getNodes, createNodeId, hasNodeChanged, store, cache, createContentDigest }
) => {
  const { createNode, touchNode, createTypes } = actions
  console.log(actions)
  console.log('other node -------------------------------------------->>')
  // const urlPromises = []
  const typeDefs = `
    type iiifTranslatedString {
      en: [ String ]
      fr: [ String ]
      none: [ String ]
    }

    type iiifLabeledString {
      label: iiifTranslatedString
      value: iiifTranslatedString
    }

    type iiifServiceJson {
      id: String
      _context: String
      profile: String
    }

    type iiifThumbnailJson {
      id: String
      type: String
      format: String
      service: iiifServiceJson
    }

    type iiifLogoJson {
      id: String
      type: String
      height: Int
      weight: Int
      format: String
    }

    type iiifHomepage {
      id: String
      type: String
      label: iiifTranslatedString
      format: String
    }

    type iiifSeeAlso {
      id: String
      type: String
      format: String
      profile: String
    }

    type iiifProviderJson {
      id: String
      type: String
      label: String
      homepage: [ iiifHomepage ]
      logo: [ iiifLogoJson ]
      seeAlso: [ iiifSeeAlso ]
    }

    type iiifItemsList {
      id: String
      type: String
      items: [iiifItemAnnotationPage]
    }

    type iiifItemAnnotationPageBody {
      id: String
      type: String
      format: String
      width: Int
      height: Int
      service: iiifServiceJson
    }

    type iiifItemAnnotationPage {
      id: ID!
      type: String
      label: iiifTranslatedString
      motivation: String
      target: String
      body: iiifItemAnnotationPageBody
    }

    type iiifItemCanvas {
      id: ID!
      type: String
      label: iiifTranslatedString
      height: Int
      width: Int
      seeAlso: [ iiifSeeAlso ]
      thumbnail: iiifThumbnailJson
      items: [iiifItemsList]
    }

    type IiifJson implements Node {
      # However Node fields are optional and you don't have to add them
      id: ID!
      _context: String
      type: String!
      label: iiifTranslatedString!
      summary: iiifTranslatedString
      requiredStatement: iiifLabeledString
      provider: iiifProviderJson
      rights: String
      metadata: [iiifLabeledString]
      thumbnail: iiifThumbnailJson
      items: [iiifItemCanvas]
    }`
  createTypes(typeDefs)
  return

  const buildNode = (data) => {
    const node = data.manifest
    node.children = (node.items || []).map(manifest => manifest.id)

    if (node['type'].toLowerCase() === 'collection') {
      node.slug = 'collection/' + md5(node.id)
    } else {
      node.slug = 'item/' + md5(node.id)
    }
    node.label = flattenLanguage(node.label)
    node.summary = flattenLanguage(node.summary)
    if (node.requiredStatement) {
      node.requiredStatement.label = flattenLanguage(node.requiredStatement.label)
      node.requiredStatement.value = flattenLanguage(node.requiredStatement.value)
    }
    node.metadata = node.metadata.map(metadata => {
      return {
        label: flattenLanguage(metadata.label),
        value: flattenLanguage(metadata.value),
      }
    })
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
      },
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
      node.topLevelParentCategory___NODE = createNodeId(topLevelParentId)
    }

    // map any subCategories so that they can be searched as foreign keys
    if (node.children) {
      node.subCategories___NODE = node.children.map(child => createNodeId(child))
      delete node.children
    }

    // allow the direct parent to be searched
    if (node.parent_id) {
      node.parentCategory___NODE = createNodeId(node.parent_id)
    }

    const nodeContent = JSON.stringify(node)

    const nodeMeta = {
      id: createNodeId(node.id),
      internal: {
        type: 'BrowseCategory',
        mediaType: `text/json`,
        content: nodeContent,
        contentDigest: createContentDigest(node),
      },
    }

    return Object.assign({}, node, nodeMeta)
  }

  const loadManifestsFile = () => {
    const contents = fs.readFileSync(path.join(__dirname, '/../../content/manifests.json'))
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
  const flattenLanguage = (data) => {
    if (!data) {
      return ''
    }
    const keys = Object.keys()
    if (keys.include(currentLanguage)) {
      return data[currentLanguage]
    }

    return data[keys.shift]
  }

  const manifestList = loadManifestsFile()

  return new Promise(async (resolve, reject) => {
    for (const tagId in manifestList.tags) {
      // const node = buildCategoryNode(manifestList.tags[tagId])
      // await createNode(node)
    }

    const manifestData = await fetchData(manifestList.manifests)

    for (const key in manifestData) {
      const data = manifestData[key]
      const node = buildNode(data)
      await createNode(node)
    }

    resolve()
  })
}
