const fetch = require('isomorphic-fetch')
const batchPromises = require('batch-promises')
const queryItem = require('./queryItem')
const merge = require('./transform/merge')
const transformAndCreate = require('./transform')
const transformAndCreateFile = require('./transform/transformAndCreateFile')

const getItems = async ({ gatsbyInternal, pluginOptions, itemList, nodeArray }) => {
  const { url, website, key, mergeItems = [], logIds = false } = pluginOptions
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
          // Check for exceptions and handle
          if (exception) {
            const mergeItem = await fetch(url, request(exception.childId, website, key))
              .then(exResult => {
                return exResult.json()
              })
              .then(exResult => {
                if (exResult.error) {
                  reject(exResult.error)
                }
                // prune extra graphQL layers
                return exResult.data.getItem
              })
            result = merge(result, mergeItem)
          }
          if (!result) {
            const err = 'Received empty result for item ' + itemId
            reject(err)
          }

          if (!skipAlephItems(result)) {
            const node = await transformAndCreate(result, gatsbyInternal, pluginOptions)
            nodeArray.push(node)
            // Create item's files
            if (resultHasFiles(result)) {
              result.files.items.forEach(async file => {
                const fileNode = await transformAndCreateFile(file, node, gatsbyInternal)
                nodeArray.push(fileNode)
                createParentChildLink({ parent: node, child: fileNode })
              })
            }
            // Check for and create child items
            if (resultHasChildren(result)) {
              const nodesData = await getItems({
                gatsbyInternal: gatsbyInternal,
                pluginOptions: pluginOptions,
                itemList: result.children.items,
                nodeArray: nodeArray,
              })
              nodesData.children.forEach(child => {
                createParentChildLink({ parent: node, child: child })
              })
              nodeArray = nodesData.everything
            }
          }
          resolve(node)
          return node
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
    return { children: results, everything: nodeArray }
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

const resultHasFiles = (result) => {
  return result && result.files && result.files.items && result.files.items.length > 0
}

const hasMergeException = (id, mergeItems) => {
  return mergeItems.find(item => item.parentId === id)
}

const skipAlephItems = (result) => {
  return false
  // expand for media.
  // return (result.TYPE === 'Item' && result.sourceSystem === 'Aleph' && result.images.items.length === 0)
}

module.exports = getItems
