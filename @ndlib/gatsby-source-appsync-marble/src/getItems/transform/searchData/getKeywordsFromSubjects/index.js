module.exports = (item) => {
  const ret = {
    themeTag: [],
    expandedThemeTag: [],
  }

  if (!item.subjects) {
    return ret
  }
  if (typeof item.subjects === 'string' || item.subjects instanceof String) {
    item.subjects = JSON.parse(item.subjects.replace(/'/g, '"'))
  }

  const removeDateRegexp = /^[-]?[0-9]{4}$/g
  // unique array of subject.term.spit on -- and trimed for space
  // filter 4 diget dates
  ret.themeTag = [...new Set([].concat.apply([], item.subjects.map(m => splitTerms(m))).filter(t => !!t).map(t => t.trim()))]
  ret.themeTag = ret.themeTag.filter(t => !t.match(removeDateRegexp))

  // unique arrof the subject variants conated with the broader terms and trimed
  // filter 4 diget dates
  ret.expandedThemeTag = [...new Set([].concat.apply([], item.subjects.map(m => addVariants(m).concat(addBroaderTerms(m)))).filter(t => !!t).map(t => t.trim()))]
  ret.expandedThemeTag = ret.expandedThemeTag.filter(t => !t.match(removeDateRegexp))
  return ret
}

const splitTerms = (term) => {
  if (term.display) {
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
