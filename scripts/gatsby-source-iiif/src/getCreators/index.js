
module.exports = (creators) => {
  return creators.map(creator => creator.display).filter((d) => d)
}
