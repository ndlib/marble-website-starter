
const citationGenerator = require('./citationGenerator')
const makeMetadataArray = require('./makeMetadataArray')

module.exports = (standardJson) => {
  const slug = `item/${standardJson.id}`

  return {
    title: standardJson.title,
    slug: slug,
    sourceSystem: standardJson.sourceSystem,
    sourceType: standardJson.TYPE,
    description: mapFieldOrDefault(standardJson, 'description', ''),
    display: standardJson.level ? standardJson.level.toLowerCase() : 'manifest',
    iiifUri: mapFieldOrDefault(standardJson, 'iiifUri', ''),
    copyrightRestricted: isCopyrightRestricted(standardJson),
    partiallyDigitized: mapFieldOrDefault(standardJson, 'partiallyDigitized', false),
    sequence: standardJson.sequence,
    citation: citationGenerator(standardJson, slug),
    metadata: makeMetadataArray(standardJson),
  }
}

const mapFieldOrDefault = (standardJson, field, defaultValue) => {
  if (field in standardJson) {
    return standardJson[field]
  }

  return defaultValue
}

const isCopyrightRestricted = (standardJson) => {
  if (standardJson.copyrightStatus) {
    return standardJson.copyrightStatus.toLowerCase() === 'copyright'
  }
  return false
}
