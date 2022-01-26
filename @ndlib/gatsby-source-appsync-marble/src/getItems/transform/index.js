const citationGenerator = require('./citationGenerator')
const makeMetadataArray = require('./makeMetadataArray')
const formatSearchData = require('./formatSearchData')
const getIiif = require('./getIiif')
module.exports = async (appSyncItem, gatsbyInternal, pluginOptions) => {
  const { actions, createContentDigest, createNodeId } = gatsbyInternal
  const { createNode } = actions
  const { iiifRoot } = pluginOptions
  const slug = `item/${appSyncItem.id}`
  const marbleObject = {
    id: createNodeId(appSyncItem.id),
    citation: citationGenerator(appSyncItem, slug),
    collection: appSyncItem.collectionId,
    sourceSystem: appSyncItem.sourceSystem,
    sourceType: appSyncItem.TYPE,
    copyrightRestricted: isCopyrightRestricted(appSyncItem),
    defaultImage: getIiif(appSyncItem.defaultImage),
    description: mapFieldOrDefault(appSyncItem, 'description', ''),
    display:  mapFieldOrDefault(appSyncItem, 'level', 'manifest'),
    iiifUri: appSyncItem.iiifResourceId && iiifRoot ? `${iiifRoot}/${appSyncItem.iiifResourceId}` : '',
    marbleId: appSyncItem.id,
    metadata: makeMetadataArray(appSyncItem),
    parentId:  appSyncItem.parentId,
    partiallyDigitized: mapFieldOrDefault(appSyncItem, 'partiallyDigitized', false),
    sequence: appSyncItem.sequence,
    searchData: await formatSearchData(appSyncItem, pluginOptions),
    slug: slug,
    title: appSyncItem.title,
    additionalDescription: appSyncItem.additionalNotes,
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
