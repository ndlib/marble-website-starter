module.exports = (item) => {
  if ('languages' in item && Array.isArray(item.languages)) {
    const lang = item.languages.map(l => l.display).filter(d => d)
    return lang
  }
  return []
}
