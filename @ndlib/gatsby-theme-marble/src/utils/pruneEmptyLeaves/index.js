module.exports = (standardJson) => {
  removeManifestsWithoutFiles(standardJson)
  removeLevelsWithOneItem(standardJson)
}

// looks at all the children of this level if they have files it keeps this item
// otherwise ir removes
// if child of this item has manifests it recures this function
const removeManifestsWithoutFiles = (standardJson) => {
  if (!standardJson.items) {
    return false
  }
  const newItems = []
  standardJson.items.forEach((child) => {
    if (childrenHaveFiles(child)) {
      newItems.push(child)
    }
    // if this child has items recure
    if (testHasItems(child)) {
      removeManifestsWithoutFiles(child)
    }
  })

  standardJson.items = newItems
}

// removes any items with one child that has a child that has files
// parent
// - remove
// -- child with files
const removeLevelsWithOneItem = (standardJson) => {
  if (!standardJson.items) {
    return false
  }

  // if this item has only one child and that child has files
  // remove the child
  // call again to ensure that the new child dpes not also just have one item.
  if (standardJson.items.length === 1 && !testHasFiles(standardJson.items[0])) {
    standardJson.items = standardJson.items[0].items
    removeLevelsWithOneItem(standardJson)
    return false
  }
  // search down the tree to look for more of the remove cases
  standardJson.items.forEach((item) => {
    if (testHasItems(item)) {
      removeLevelsWithOneItem(item)
    }
  })

  return false
}

// does any of this items children have files
const childrenHaveFiles = (standardJson) => {
  if (!standardJson.items) {
    return false
  } else if (testHasFiles(standardJson)) {
    return true
  }

  if (standardJson.items.some(item => childrenHaveFiles(item))) {
    return true
  }
  return false
}

// tests if the current item has files
const testHasFiles = (stdJson) => {
  return (stdJson.items && stdJson.items[0] && stdJson.items[0].level === 'file')
}

// test if the current item has more items below its
const testHasItems = (stdJson) => {
  return (stdJson.items && stdJson.items[0] && (stdJson.items[0].level === 'manifest' || stdJson.items[0].level === 'collection'))
}
