
module.exports = (manifest) => {
  const ret = []
  if (manifest.creators) {
    ret.push(manifest.creators.map(creator => creator.display).filter((d) => d))
  }
  if (manifest.contributors) {
    ret.push(manifest.contributors.map(creator => creator.display).filter((d) => d))
  }
  return ret
}
