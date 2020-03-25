
module.exports = (manifest) => {
  if (!manifest.subjects) {
    return []
  }

  if (typeof manifest.subjects === 'string' || manifest.subjects instanceof String) {
    manifest.subjects = JSON.parse(manifest.subjects.replace(/'/g, '"'))
  }

  return manifest.subjects.map(m => {
    return m.term
  })
}
