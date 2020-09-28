const punctuationStripper = (value) => {
  value = value.trim()
  return value.replace(/(\[|\]|[.]$|[,]$|[/]$|[:]$|[;]$)/g, '').trim()
}

const stripFields = [
  'title',
  'creator.display',
  'subject.display',
]

const checkNested = (obj, field) => {
  const args = field.split('.')

  for (let i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return false
    }
    obj = obj[args[i]]
  }
  return true
}

const stripPunctuationFromField = (schema, path) => {
  const pList = path.split('.')
  const len = pList.length
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i]
    if (!schema[elem]) schema[elem] = {}
    schema = schema[elem]
  }

  schema[pList[len - 1]] = punctuationStripper(schema[pList[len - 1]])
}

module.exports = (standardJson) => {
  stripFields.forEach((field) => {
    if (checkNested(standardJson, field)) {
      stripPunctuationFromField(standardJson, field)
    }
  })
}
