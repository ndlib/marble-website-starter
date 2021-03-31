module.exports = (website, websiteBatchLimit = 10000, nextToken = '') => {
  return `{
      getWebsite(id: "${website}") {
        websiteItems(nextToken: "${nextToken}", limit: ${websiteBatchLimit}) {
          nextToken
          items {
            itemId
          }
        }
      }
    }`
}
