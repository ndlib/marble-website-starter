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
      creationPlace {
        city
        continent
        country
        county
        historic
        state
      }
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
          sourceUri
          title
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
