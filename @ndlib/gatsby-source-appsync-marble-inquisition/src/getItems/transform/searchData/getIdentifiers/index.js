module.exports = (item) => {
  const ret = []
  if (item.uniqueIdentifier) {
    ret.push(item.uniqueIdentifier)
  }
  if (item.sourceSystem.toLowerCase() === 'aleph') {
    ret.push(item.id)
  }

  return ret
}
