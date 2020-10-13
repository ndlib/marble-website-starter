
module.exports = (manifest) => {
  const ret = {
    themeTag: [],
    expandedThemeTag: [],
  }

  if (!manifest.subjects) {
    return ret
  }

  if (typeof manifest.subjects === 'string' || manifest.subjects instanceof String) {
    manifest.subjects = JSON.parse(manifest.subjects.replace(/'/g, '"'))
  }

  // unique array of subject.term.spit on -- and trimed for space
  ret.themeTag = [...new Set([].concat.apply([], manifest.subjects.map(m => splitTerms(m))).map(t => t.trim()))]
  // unique arrof the subject variants conated with the broader terms and trimed
  ret.expandedThemeTag = [...new Set([].concat.apply([], manifest.subjects.map(m => addVariants(m).concat(addBroaderTerms(m)))).map(t => t.trim()))]

  return ret
}

const splitTerms = (term) => {
  if ('display' in term) {
    return term.display.split('--')
  }
  return []
}

const addVariants = (subject) => {
  if (!subject.variants) {
    return []
  }

  return subject.variants
}

const addBroaderTerms = (subject) => {
  if (!subject.broaderTerms) {
    return []
  }

  return [].concat.apply([], subject.broaderTerms.map((bt) => {
    return splitTerms(bt)
  }))
}
