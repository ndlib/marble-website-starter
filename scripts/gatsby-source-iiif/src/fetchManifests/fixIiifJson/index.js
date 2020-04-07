const configuration = require('../../../../../site/content/configuration.js')

const traverseAndFixData = (o) => {
  for (const i in o) {
    if (objectIsLabelORValue(i)) {
      o[i] = fixLanguage(o[i])
    } else if (continueTraversing(o[i])) {
      // going one step down in the object tree!!
      traverseAndFixData(o[i])
      removeProvider(o[i])
    }
  }
}

const objectIsLabelORValue = (key) => {
  return ((key === 'label' || key === 'value' || key === 'summary'))
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
    data[configuration.siteMetadata.languages.default] = save
  }
  const ret = {}
  configuration.siteMetadata.languages.allowed.forEach((lang) => {
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

const removeProvider = (data) => {
  // delete data['@context']
  // delete data.seeAlso

  if (data.provider && (!data.type || data.type === 'Canvas')) {
    // delete data.provider
  }

  return data
}

module.exports = traverseAndFixData
