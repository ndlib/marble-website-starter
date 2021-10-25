const fetch = require('isomorphic-fetch')
const batchPromises = require('batch-promises')
const queryItem = require('./queryItem')
const merge = require('./transform/merge')
const transformAndCreate = require('./transform')
const transformAndCreateFile = require('./transform/transformAndCreateFile')

const getItems = async ({ gatsbyInternal, pluginOptions, itemList, nodeArray, collection = null, parent = null }) => {
  const { url, website, key, mergeItems = [], logIds = false, skipEmptyAleph = true } = pluginOptions
  const { createParentChildLink } = gatsbyInternal.actions
  return await batchPromises(
    10,
    itemList,
    itemStub => new Promise((resolve, reject) => {
      // Results for getItemList have an id of "itemId"
      // Children created recursively will have an id of "id"
      const itemId = itemStub.itemId || itemStub.id
      if (logIds) {
        console.log(itemId)
      }
      const exception = hasMergeException(itemId, mergeItems)
      fetch(url, request(itemId, website, key))
        .then(result => {
          return result.json()
        })
        .then(result => {
          if (result.error) {
            reject(result.error)
          } else if (!result.data.getItem) {
            const err = 'Got result, but it was null for item ' + itemId
            reject(err)
          }
          // prune extra graphQL layers
          return result.data.getItem
        })
        .then(async result => {        
          if (!result) {
            const err = 'Received empty result for item ' + itemId
            reject(err)
          }

          if (parent) {
            if (!result.parentTitles) {
              result.parentTitles = []
              if (process.env.ONLY_SEARCH_CHILDNODES !== 'true') {
                result.parentTitles.push(collection.title)
              }              
            }
            result.parentTitles.push(parent.title)
          }

          if (result.parentId === 'root' || !resultHasChildren(result)) { 
            const node = result // 
            const insertNode = await transformAndCreate(result, gatsbyInternal, pluginOptions)
            nodeArray.push(insertNode)

            // Create item's files (images and media)
            resultFiles(result).forEach(async file => {
              const fileNode = await transformAndCreateFile(file, insertNode, gatsbyInternal)
              nodeArray.push(fileNode)
              //sconsole.log(insertNode, fileNode)
              //createParentChildLink({ parent: insertNode, child: fileNode })
            })
          }

          if (result.parentId === 'root') {
            collection = result
          }

          // Check for and create child items
          if (resultHasChildren(result)) {
            const nodesData = await getItems({
              gatsbyInternal: gatsbyInternal,
              pluginOptions: pluginOptions,
              itemList: result.children.items,
              nodeArray: nodeArray, 
              collection: collection,
              parent: result,
            })
            nodesData.children.forEach(child => {
              //createParentChildLink({ parent: insertNodes, child: child })
            })
          }            
          resolve(result)                 
        })
        .catch(err => {
          console.error('Oops: ' + err)
          reject(err)
          return 1
        })
        // after fetch
    }).then(result => {
      return result
    }),
  ).then(async results => {    
    return {children: results}
  })
}

const request = (itemId, website, key) => {
  return {
    headers: {
      'x-api-key': key,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ query: queryItem(itemId, website) }),
  }
}
const resultHasChildren = (result) => {
  return result && result.children && result.children.items && result.children.items.length > 0
}

const resultFiles = (result) => {
  const images = result?.images?.items || []
  const media = result?.media?.items || []
  return images.concat(media)
}

const hasMergeException = (id, mergeItems) => {
  return mergeItems.find(item => item.parentId === id)
}

const alephEmptyResult = (result) => {
  return (result.TYPE === 'Item' && result.sourceSystem === 'Aleph' && result.images.items.length === 0)
}

module.exports = getItems
