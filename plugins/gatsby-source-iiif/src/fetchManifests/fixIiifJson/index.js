const configuration = require('../../../../../content/configuration.js')

const traverseAndFixData = (o) => {
  for (const i in o) {
    if (objectIsLabelORValue(i, o[i])) {
      o[i] = fixLanguage(o[i])
    } else if (continueTraversing(o[i])) {
      // going one step down in the object tree!!
      traverseAndFixData(o[i])
    }
  }
}

const objectIsLabelORValue = (key, obj) => {
  return ((key === 'label' || key === 'value' || key === 'summary') && typeof (obj) === 'object')
}

const continueTraversing = (obj) => {
  return (obj !== null && typeof (obj) === 'object')
}

const fixLanguage = (data) => {
  if (!data) {
    return undefined
  }
  if (typeof (data) !== 'object') {
    if (!Array.isArray(data)) {
      data = [data]
    }
    const save = data
    data = { }
    data[configuration.languages.default] = save
  }

  const ret = {}
  configuration.languages.allowed.forEach((lang) => {
    if (data[lang]) {
      if (!Array.isArray(data[lang])) {
        data[lang] = [data[lang]]
      }
      ret[lang] = data[lang]
    } else {
      ret[lang] = ['']
    }
  })
  return ret
}

module.exports = traverseAndFixData
