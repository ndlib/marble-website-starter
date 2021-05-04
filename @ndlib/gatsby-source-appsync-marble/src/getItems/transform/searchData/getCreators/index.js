module.exports = (item) => {
  let ret = []
  if (item && item.creators) {
    ret = item.creators.map(creator => creator.display).filter((d) => d)
  }
  if (item && item.contributors) {
    ret = ret.concat(item.contributors.map(cont => cont.display).filter((d) => d))
  }
  return ret
}
