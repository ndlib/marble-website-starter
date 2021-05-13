module.exports = (itemId, website) => {
  return `{
  getItem(id: "${itemId}", websiteId: "${website}") {
    TYPE
    access
    additionalNotes
    children {
     items {
       id
     }
    }
    collectionId
    collections {
      display
    }
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
    digitizationSource
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
    geographicLocations {
      display
    }
    id
    iiifResourceId
    languages {
     display
    }
    level
    linkToSource
    objectFileGroupId
    parentId
    partiallyDigitized
    physicalAccess
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
