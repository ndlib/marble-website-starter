module.exports = (item) => {
  if (item.collections && item.collections.length > 0) {
    return item.collections.map((c) => c.display)
  } else if (item.parent) {
    return getAncestorTitlesRecursive(item.parent)
  }

  return []
}

const getAncestorTitlesRecursive = (item) => {
  let results = []
  if (item.level === 'collection' && item.title) {
    results.push(item.title)
  }
  if (item.parent) {
    results = results.concat(getAncestorTitlesRecursive(item.parent))
  }
  return results
}
