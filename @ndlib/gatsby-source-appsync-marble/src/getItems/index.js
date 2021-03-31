const fetch = require('isomorphic-fetch')
const batchPromises = require('batch-promises')
const queryItem = require('./queryItem')
const transformAndCreate = require('./transform')
const transformAndCreateFile = require('./transform/transformAndCreateFile')

const getItems = async ({ gatsbyInternal, pluginOptions, itemList, nodeArray }) => {
  const { url, website, key } = pluginOptions
  const { createParentChildLink } = gatsbyInternal.actions

  return await batchPromises(
    10,
    itemList,
    itemStub => new Promise((resolve, reject) => {
      // Results for getItemList have an id of "itemId"
      // Children created recursively will have an id of "id"
      const itemId = itemStub.itemId || itemStub.id
      console.log(itemId)
      fetch(
        url,
        {
          headers: {
            'x-api-key': key,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({ query: queryItem(itemId, website) }),
        })
        .then(result => {
          return result.json()
        })
        .then(result => {
          if (result.error) {
            reject(result.error)
          }
          // prune extra graphQL layers
          return result.data.getItem
        })
        .then(async result => {
          const node = await transformAndCreate(result, gatsbyInternal)
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
          resolve(node)
          return node
        })
        // after fetch
    }).then(result => {
      return result
    }),
  ).then(async results => {
    return { children: results, everything: nodeArray }
  })
}

const resultHasChildren = (result) => {
  return result && result.children && result.children.items && result.children.items.length > 0
}

const resultHasFiles = (result) => {
  return result && result.files && result.files.items && result.files.items.length > 0
}

module.exports = getItems
