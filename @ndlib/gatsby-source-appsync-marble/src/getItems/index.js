const fetch = require('isomorphic-fetch')
const batchPromises = require('batch-promises')
const queryItem = require('./queryItem')
const merge = require('./transform/merge')
const transformAndCreate = require('./transform')
const transformAndCreateFile = require('./transform/transformAndCreateFile')

const getItems = async ({
  gatsbyInternal,
  pluginOptions,
  itemList,
  nodeArray,
}) => {
  const {
    url,
    website,
    key,
    mergeItems = [],
    logIds = false,
    skipEmptyAleph = true,
  } = pluginOptions

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
        .then(async result => {
          if (result.error) {
            reject(result.error)
          } else if (!result.data.getItem) {
            const err = 'Got result, but it was null for item ' + itemId
            reject(err)
          }

          // Keep retreiving children as long as there is a next token
          let nextToken = result.data.getItem.children.nextToken
          while (nextToken !== null) {
            await fetch(url, request(itemId, website, key, nextToken))
              .then(r => {
                return r.json()
              })
              .then(r => {
                if (r.error) {
                  reject(r.error)
                } else if (!r.data.getItem) {
                  const err = 'Got result, but it was null for item ' + itemId
                  reject(err)
                }

                // join new children to exisiting  children
                result.data.getItem.children.items = result.data.getItem.children.items.concat(r.data.getItem.children.items)

                // update or delete token
                if (r.data.getItem.children.nextToken) {
                  nextToken = r.data.getItem.children.nextToken
                } else {
                  nextToken = null
                }
              })
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
          if (skipEmptyAleph && alephEmptyResult(result)) {
            if (logIds) {
              console.log('Skipping', result.id)
            }
            resolve('Valid result, be we do not want it')
          }
          const node = await transformAndCreate(result, gatsbyInternal, pluginOptions)
          nodeArray.push(node)
          // Create item's files (images and media)
          resultFiles(result).forEach(
            async file => {
              const fileNode = await transformAndCreateFile(file, node, gatsbyInternal)
              nodeArray.push(fileNode)
              createParentChildLink({ parent: node, child: fileNode })
            },
          )
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
          resolve(node)
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

const request = (itemId, website, key, nextChildToken = null) => {
  return {
    headers: {
      'x-api-key': key,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ query: queryItem(itemId, website, nextChildToken) }),
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
