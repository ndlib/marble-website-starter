const fetch = require('isomorphic-fetch')
const batchPromises = require('batch-promises')
const queryItem = require('./queryItem')

const getItems = async ({
  url, itemList, website, key, progressBar,
}) => {
  return await batchPromises(
    10,
    itemList,
    itemStub => new Promise((resolve, reject) => {
      const itemId = itemStub.itemId || itemStub.id
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
      if (progressBar) {
        progressBar.increment()
      }
      return result
    }),
  ).then(results => {
    return results
  })
}

const resultHasChildren = (result) => {
  return result && result.children && result.children.items && result.children.items.length > 0
}

module.exports = getItems