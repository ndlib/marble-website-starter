
module.exports = (manifest) => {
  if (!manifest.subjects) {
    return []
  }

  if (typeof manifest.subjects === 'string' || manifest.subjects instanceof String) {
    manifest.subjects = JSON.parse(manifest.subjects.replace(/'/g, '"'))
  }

  // uniqe an array of
  // subjects.term that split all the -- into individual terms
  // adding in the variant terms for that subject
  // adding in the broader terms.term for that subject
  // [].concat.apply([], []) flattens an array
  return [...new Set([].concat.apply([], manifest.subjects.map(m => {
    return splitTerms(m.display).concat(addVariants(m)).concat(addBroaderTerms(m))
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
    return bt.display
  })
}
