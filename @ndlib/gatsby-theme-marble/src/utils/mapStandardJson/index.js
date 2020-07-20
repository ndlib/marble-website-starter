const path = require('path')
const citationGenerator = require(path.join(__dirname, 'citationGenerator'))
const makeMetadataArray = require(path.join(__dirname, 'makeMetadataArray'))

module.exports = (standardJson) => {
  const slug = `item/${standardJson.id}`

  return {
    title: standardJson.title,
    slug: slug,
    description: mapFieldOrDefault(standardJson, 'description', ''),
    display: standardJson.level.toLowerCase(),
    iiifUri: mapFieldOrDefault(standardJson, 'iiifUri', ''),
    copyrightRestricted: ('copyrightStatus' in standardJson && standardJson.copyrightStatus.toLowerCase() === 'copyright'),
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
