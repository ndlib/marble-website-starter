module.exports = (itemId, website) => {
  return `{
  getItem(id: "${itemId}", websiteId: "${website}") {
    files {
      items {
        TYPE
        dateAddedToDynamo
        dateModifiedInDynamo
        eTag
        expireTime
        id
        iiifImageUri
        iiifUri
        key
        label
        lastModified
        objectFileGroupId
        path
        sequence
        size
        source
        sourceType
        sourceUri
        storageClass
      }
    }
  }`
}
