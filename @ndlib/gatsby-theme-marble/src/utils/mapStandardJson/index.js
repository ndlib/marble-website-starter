const path = require('path')
const citationGenerator = require(path.join(__dirname, 'citationGenerator'))
const makeMetadataArray = require(path.join(__dirname, 'makeMetadataArray'))
const punctuationStripper = require(path.join(__dirname, 'punctuationStripper'))

module.exports = (standardJson) => {
  const slug = `item/${standardJson.id}`

  return {
    title: punctuationStripper(standardJson.title),
    slug: slug,
    description: mapFieldOrDefault(standardJson, 'description', ''),
    display: standardJson.level.toLowerCase(),
    iiifUri: mapFieldOrDefault(standardJson, 'iiifUri', ''),
    copyrightRestricted: ('copyrightStatus' in standardJson && standardJson.copyrightStatus.toLowerCase() === 'copyright'),
    partiallyDigitized: mapFieldOrDefault(standardJson, 'partiallyDigitized', false),
    sequence: standardJson.sequence,
    citation: citationGenerator(standardJson, slug),
    metadata: makeMetadataArray(standardJson),
    search: {
      id: standardJson.id,
      name: standardJson.title,
      thumbnail: standardJson.iiifImageUri,
      url: '/item/' + standardJson.id,
      creator: [],
      collection: [],
      identifier: [],
      repository: [],
      themeTag: [],
      centuryTag: [],
      lowestSearchRange: dateData.undated ? -500000 : dateData.lowestSearchRange,
      highestSearchRange: dateData.undated ? 500000 : dateData.highestSearchRange,
      formatTag: [standardJson.workType],
      languages: [standardJson.languages],
    },
  }
}

const mapFieldOrDefault = (standardJson, field, defaultValue) => {
  if (field in standardJson) {
    return punctuationStripper(standardJson[field])
  }

  return defaultValue
}
