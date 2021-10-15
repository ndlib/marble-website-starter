module.exports = (item) => {
  if (item.parentTitles) {
    return item.parentTitles
  } else if (item.collections && item.collections.length > 0) {
    return item.collections.map((c) => c.display)
  } 

  return []
}
