const fetch = require('isomorphic-fetch')
const queryWebsite = require('./queryWebsite')

const getListOfItems = async (pluginOptions, token = '', items = []) => {
  const { url, key, website, websiteBatchLimit } = pluginOptions

  return await fetch(
    url,
    {
      headers: {
        'x-api-key': key,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ query: queryWebsite(website, websiteBatchLimit, token) }),
    })
    .then(result => {
      return result.json()
    })
    .then(async result => {
      const nextToken = result.data.getWebsite.websiteItems.nextToken
      const newItems = result.data.getWebsite.websiteItems.items
      const allItems = items.concat(newItems)
      if (nextToken) {
        return await getListOfItems(pluginOptions, nextToken, allItems)
      }
      return allItems
    })
}

module.exports = getListOfItems
