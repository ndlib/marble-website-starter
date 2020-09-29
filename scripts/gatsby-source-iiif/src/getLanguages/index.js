
module.exports = (manifest) => {
  if ('languages' in manifest) {
    return manifest.languages.map(language => language.display).filter((d) => d)
  }
  return []
}
