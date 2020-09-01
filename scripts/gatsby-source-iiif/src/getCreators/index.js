
module.exports = (manifest) => {
  let ret = []
  if (manifest && manifest.creators) {
    ret = manifest.creators.map(creator => creator.display).filter((d) => d)
  }
  if (manifest && manifest.contributors) {
    ret = ret.concat(manifest.contributors.map(cont => cont.display).filter((d) => d))
  }
  return ret
}
