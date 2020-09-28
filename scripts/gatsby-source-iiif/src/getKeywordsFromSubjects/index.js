
module.exports = (manifest) => {
  if (!manifest.subjects) {
    return []
  }

  if (typeof manifest.subjects === 'string' || manifest.subjects instanceof String) {
    manifest.subjects = JSON.parse(manifest.subjects.replace(/'/g, '"'))
  }

  return [...new Set([].concat.apply([], manifest.subjects.map(m => {
    return splitTerms(m.term).concat(addVariants(m)).concat(addBroaderTerms(m))
  })))].map((t) => {
    return t.trim()
  })
}

const splitTerms = (term) => {
  return term.split('--')
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

  return subject.broaderTerms.map((bt) => {
    return bt.term
  })
}
