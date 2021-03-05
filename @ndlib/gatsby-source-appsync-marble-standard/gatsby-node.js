const cliProgress = require('cli-progress')
const getListOfItems = require('./src/getListOfItems')
const getItems = require('./src/getItems')
const macDNS = require('./src/macDNS')
// const writeDebug = require('./src/writeDebug')

exports.sourceNodes = async ({ actions, createContentDigest }, pluginOptions) => {
  console.time('total time')
  console.time('fetch items')
  const { url, key, website } = pluginOptions
  await macDNS(url)

  const { createNode } = actions
  const itemList = await getListOfItems(pluginOptions)
  // const itemList = [
  //   { itemId: 'BPP1001_EAD' },
  //   { itemId: 'MSNCW5066_EAD' },
  //   { itemId: '2008.026.008' },
  // ]
  console.log('Total top level items: ', itemList.length)

  const progressBar = new cliProgress.SingleBar({
    format: 'Items Downloaded |' + '{bar}' + '| {percentage}% || {value}/{total} Items',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  })
  progressBar.start(itemList.length, 0, {
    speed: 'N/A',
  })
  const everything = await getItems({
    url: url,
    itemList: itemList,
    website: website,
    key: key,
    progressBar: progressBar,
  })
  progressBar.stop()
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
    }
  })
  console.timeEnd('generate standard nodes')
  console.timeEnd('total time')
}
