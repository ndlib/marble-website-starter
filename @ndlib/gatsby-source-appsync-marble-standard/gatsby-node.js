const cliProgress = require('cli-progress')
const getListOfItems = require('./src/getListOfItems')
const getItems = require('./src/getItems')
const macDNS = require('./src/macDNS')
// const writeDebug = require('./src/writeDebug')

exports.sourceNodes = async ({ actions, createContentDigest, cache }, pluginOptions) => {
  const { createNode, touchNode } = actions
  const { url, key, website } = pluginOptions
  await macDNS(url)

  console.time('total time')
  console.time('fetch items')

  const cachedList = await cache.get('standardItemListCacheKey')
  let itemList
  if (cachedList) {
    console.log('Have a cached list of items.')
    itemList = cachedList
  } else {
    console.log('Do not have a cached list of items.')
    itemList = await getListOfItems(pluginOptions)
  }
  await cache.set('standardItemListCacheKey', itemList)

  console.log('Total top level items: ', itemList.length)

  const cachedStandardEverything = await cache.get('standardItemsCachedKey')
  let everything
  if (cachedStandardEverything) {
    console.log('Have a giant cache blob of everything.')
    everything = cachedStandardEverything
  } else {
    console.log('Need to fetch everything.')
    const progressBar = new cliProgress.SingleBar({
      format: '{bar} {percentage}% || {value}/{total} Top Level Items',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    })
    progressBar.start(itemList.length, 0, {
      speed: 'N/A',
    })
    everything = await getItems({
      url: url,
      itemList: itemList,
      website: website,
      key: key,
      progressBar: progressBar,
    })
    progressBar.stop()
  }
  await cache.set('standardItemsCachedKey', everything)
  console.timeEnd('fetch items')
  // await writeDebug(everything)
  console.time('generate standard nodes')
  everything.forEach(item => {
    if (item && item.id) {
      const nodeContent = JSON.stringify(item)
      const nodeMeta = {
        internal: {
          type: 'AppSyncStandard',
          content: nodeContent,
          contentDigest: createContentDigest(item),
        },
      }
      const node = Object.assign({}, item, nodeMeta)
      createNode(node)
      touchNode(node)
    }
  })
  console.timeEnd('generate standard nodes')
  console.timeEnd('total time')
}
