const citationGenerator = require('./citationGenerator')
const makeMetadataArray = require('./makeMetadataArray')

module.exports = async (appSyncItem, gatsbyInternal) => {
  const { actions, createContentDigest, createNodeId } = gatsbyInternal
  const { createNode } = actions

  const slug = `item/${appSyncItem.id}`
  const marbleObject = {
    id: createNodeId(appSyncItem.id),
    citation: citationGenerator(appSyncItem, slug),
    collection: appSyncItem.collectionId,
    copyrightRestricted: isCopyrightRestricted(appSyncItem),
    description: mapFieldOrDefault(appSyncItem, 'description', ''),
    display:  mapFieldOrDefault(appSyncItem, 'level', 'manifest'),
    iiifUri: mapFieldOrDefault(appSyncItem, 'iiifUri', ''),
    marbleId: appSyncItem.id,
    metadata: makeMetadataArray(appSyncItem),
    parentId: appSyncItem.parentId,
    partiallyDigitized: mapFieldOrDefault(appSyncItem, 'partiallyDigitized', false),
    sequence: appSyncItem.sequence,
    slug: slug,
    title: appSyncItem.title,
  }
  const nodeContent = JSON.stringify(marbleObject)
  const normalizedTypeNode = {
    ...marbleObject,
    internal: {
      type: 'MarbleItem',
      content: nodeContent,
      contentDigest: createContentDigest(marbleObject),
    },
  }
  await createNode(normalizedTypeNode)
  return normalizedTypeNode
}

const mapFieldOrDefault = (item, field, defaultValue) => {
  if (field in item) {
    return item[field]
  }
  return defaultValue
}

const isCopyrightRestricted = (item) => {
  if (item.copyrightStatus) {
    return item.copyrightStatus.toLowerCase() === 'copyright'
  }
  return false
}
