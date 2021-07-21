const getItems = require('./src/getItems')
const macDNS = require('./src/macDNS')
const getItemList = require('./src/getItemList')
const cacheRebuild = require('./src/cacheRebuild')
const fixtureData = require('./data/fixtureData')
const writeDebug = require('./src/writeDebug')

// eslint-disable-next-line complexity
exports.sourceNodes = async (
  gatsbyInternal,
  pluginOptions,
) => {
  const { url, key, website, itemList, useFixtures = false, updateFixtures = false, debug = false } = pluginOptions
  const { cache } = gatsbyInternal

  let cachedMarbleNodes
  if (useFixtures) {
    // Create a fake cache as the fixture and load it manually.
    cachedMarbleNodes = fixtureData
  } else if (!url || !key) {
    console.error('Missing AppSync connection parameters.')
    return 1
  } else if (!website && !itemList) {
    console.error('Missing website or itemList.')
    return 1
  } else {
    cachedMarbleNodes = await cache.get('marbleNodes')
  }

  if (cachedMarbleNodes) {
    console.log('rebuild from cache')
    return await cacheRebuild(cachedMarbleNodes, gatsbyInternal)
  } else {
    await macDNS(url)
    const listOfItems = itemList || await getItemList(pluginOptions)
    const nodesData = await getItems({
      gatsbyInternal: gatsbyInternal,
      pluginOptions: pluginOptions,
      itemList: listOfItems,
      nodeArray: [],
    })
    await cache.set('marbleNodes', nodesData.everything)
    if (debug || updateFixtures) {
      const cleanNodeData = nodesData.everything.map(n => {
        delete n.internal.owner
        return n
      })
      await writeDebug(cleanNodeData, updateFixtures)
    }
  }
}

// predefine stuff we expect from configuration.js
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
  ### Marble Item Stuff
  type metadataData @dontInfer {
    label: String
    value: [String]
    urlField: String
    type: String
  }
  type marbleIiifFile @dontInfer {
    default: String
    service: String
    thumbnail: String
  }
  type MarbleFile implements Node {
    id: String!
    marbleId: String!
    collection: MarbleItem
    parentId: String
    name: String
    title: String
    sequence: Int
    file: String
    extension: String
    fileType: String
    iiif: marbleIiifFile
    local: File @link(by: "name", from: "name")
    marbleParent: MarbleItem @link(by: "id", from: "parentId")
  }
  type MarbleItem implements Node {
    id: String!
    marbleId: String!
    slug: String!
    display: String
    sourceSystem: String
    sourceType: String
    title: String!
    description: String
    sequence: Int
    iiifUri: String
    partiallyDigitized: Boolean
    metadata: [metadataData]
    copyrightRestricted: Boolean
    childrenMarbleItem: [MarbleItem]
    childrenMarbleFile: [MarbleFile] @link(by: "parentId", from: "id")
    citation: String
    parentId: String
    marbleParent: MarbleItem @link(by: "marbleId", from: "parentId")
    searchData: searchData
  }

  type searchData {
    id: String
    name: String
    creator: [String]
    collection: [String]
    parent: String
    identifier: [String]
    geographicLocation: [String]
    repository: String
    themeTag: [String]
    expandedThemeTag: [String]
    centuryTag: [String]
    date: String
    lowestSearchRange: Int
    highestSearchRange: Int
    workType: [String]
    thumbnail: String
    language: [String]
    type: String
    url: String
    formatTag: [String]
    allMetadata: [String]
  }
  `
  createTypes(typeDefs)
}
