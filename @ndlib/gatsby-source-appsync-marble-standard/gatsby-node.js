const fetch = require('isomorphic-fetch')

const query = `{
    getWebsite(id: "marble") {
      websiteItems {
        items {
          ItemMetadata {
            id
            title
            TYPE
            collectionId
            copyrightStatement
            copyrightStatus
            copyrightUrl
            createdDate
            creators {
              display
            }
            dateAddedToDynamo
            dateModifiedInDynamo
            dedication
            defaultFilePath
            description
            digitalAccess
            dimensions
            expireTime
            iiifUri
            languages {
              display
            }
            level
            linkToSource
            objectFileGroupId
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
            treePath
            uniqueIdentifier
            workType
          }
        }
      }
    }
  }`

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, pluginOptions) => {
  const { createNode } = actions
  const { url, key } = pluginOptions

  await fetch(
    url,
    {
      headers: {
        'x-api-key': key,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ query: query }),
    })
    .then(result => {
      return result.json()
    })
    .then(result => {
      const items = result.data.getWebsite.websiteItems.items
      // console.log(JSON.stringify(items, null, 2))
      items.forEach(item => {
        const nodeContent = JSON.stringify(item.ItemMetadata)
        const nodeMeta = {
          id: item.ItemMetadata.id, // createNodeId(item.ItemMetadata.id),
          parent: null,
          children: [],
          internal: {
            type: 'AppSyncStandard',
            content: nodeContent,
            contentDigest: createContentDigest(item.ItemMetadata),
          },
        }
        const node = Object.assign({}, item.ItemMetadata, nodeMeta)
        createNode(node)
      })
    })
}
