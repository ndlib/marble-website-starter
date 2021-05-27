module.exports = (item) => {
  if (item.collections && item.collections.length > 0) {
    return item.collections.map((c) => c.display)
  } else if (item.parent) {
    return [item.parent.title]
  }

  return []
}
