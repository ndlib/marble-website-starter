const fetch = require('isomorphic-fetch')
const batchPromises = require('batch-promises')
const queryItem = require('./queryItem')

const getItems = async ({
  url, itemList, website, key,
}) => {
  return await batchPromises(
    10,
    itemList,
    itemStub => new Promise((resolve, reject) => {
      const itemId = itemStub.itemId || itemStub.id
      // console.log(itemId)
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
          // prune extra graphQL layers
          if (result.error) {
            // console.log(JSON.stringify(result.error, null, 2))
            // reject(result.error)
          }
          return result.data.getItem
        })
        .then(async result => {
          // console.log(JSON.stringify(result, null, 2))
          let subItems = []
          if (resultHasChildren(result)) {
            subItems = await getItems({
              url: url,
              itemList: result.children.items,
              website: website,
              key: key,
            })
          }
          if (result && result.children) {
            delete result.children
          }
          const newResult = Object.assign({}, result, { subItems: subItems })
          resolve(newResult)
          return newResult
        })
    }).then(result => {
      // console.log(JSON.stringify(result, null, 2))
      return result
    }),
  ).then(results => {
    // do something when done with all
    // console.log(results.length)
    return results
  })
}

const resultHasChildren = (result) => {
  return result && result.children && result.children.items && result.children.items.length > 0
}

module.exports = getItems
