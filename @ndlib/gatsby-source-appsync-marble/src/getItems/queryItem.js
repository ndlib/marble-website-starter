module.exports = (itemId, website) => {
  return `{
  getItem(id: "${itemId}", websiteId: "${website}") {
      TYPE
      children {
        items {
          id
        }
      }
      collectionId
      copyrightStatement
      copyrightStatus
      copyrightUrl
      createdDate
      creators {
        display
      }
      dedication
      defaultFilePath
      description
      digitalAccess
      dimensions
      files {
        items {
          id
          mediaResourceId
          mediaServer
          mimeType
          sequence
        }
      }
      format
      id
      iiifUri
      languages {
        display
      }
      level
      linkToSource
      objectFileGroupId
      parentId
      partiallyDigitized
      publishers {
        display
      }
      repository
      sequence
      sourceSystem
      subjects {
        authority
        display
        parentTerm
        term
        uri
        variants
      }
      suppliedWebsiteId
      title
      treePath
      uniqueIdentifier
      workType
    }
  }`
}
