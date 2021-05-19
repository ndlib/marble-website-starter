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
