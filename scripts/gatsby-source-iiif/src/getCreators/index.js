
module.exports = (creators) => {
  if (creators) {
    return creators.map(creator => creator.display).filter((d) => d)
  }
  return []
}
