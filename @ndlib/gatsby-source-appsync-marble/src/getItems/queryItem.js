module.exports = (itemId, website, childrenNextToken) => {
  return `{
  getItem(id: "${itemId}", websiteId: "${website}") {
    TYPE
    access
    additionalNotes
    children(nextToken: ${childrenNextToken ? '"' + childrenNextToken + '"' : null}) {
      nextToken
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
    defaultImage {
      id
      mediaResourceId
      mediaServer
      mimeType
      sequence
      sourceUri
      title
    }
    description
    digitalAccess
    digitizationSource
    dimensions
    media {
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
    images {
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
    medium
    imageGroupId
    parentId
    parent {
      id
      title
      level
    }
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
