module.exports = (parent, child) => {
  const mergedObject = {
    sequence: 0,
  }

  const chooseParentFields = [
    'TYPE',
    'collectionId',
    'copyrightStatement',
    'copyrightStatus',
    'copyrightUrl',
    'createdDate',
    'dedication',
    'defaultFilePath',
    'description',
    'digitalAccess',
    'dimensions',
    'format',
    'id',
    'iiifUri',
    'level',
    'linkToSource',
    'objectFileGroupId',
    'parentId',
    'partiallyDigitized',
    'repository',
    'sourceSystem',
    'suppliedWebsiteId',
    'title',
    'treePath',
    'uniqueIdentifier',
    'workType',
  ]
  const chooseChildFields = [
    'children',
    'files',
  ]
  const mergeArrayFields = [
    'creators',
    'languages',
    'publishers',
    'subjects',
  ]

  chooseParentFields.forEach(field => {
    mergedObject[field] = preferParent(parent, child, field)
  })
  chooseChildFields.forEach(field => {
    mergedObject[field] = preferChild(parent, child, field)
  })
  mergeArrayFields.forEach(field => {
    mergedObject[field] = mergeFieldArray(parent, child, field)
  })

  return mergedObject
}

const preferParent = (parent, child, field) => {
  return parent[field] || child[field] || null
}
const preferChild = (parent, child, field) => {
  return child[field] || parent[field] || null
}

const mergeFieldArray = (parent, child, field) => {
  if (!parent[field] && !child[field]) {
    return null
  } else if (!parent[field]) {
    return child[field]
  } else if (!child[field]) {
    return parent[field]
  }
  return [...parent[field], ...child[field]]
}
