const realDatesFromCatalogedDates = require('../searchData/realDatesFromCatalogedDates')
const determineProvider = require('../searchData/determineProvider')
const getCreators = require('../searchData/getCreators')
const getGeographicLocations = require('../searchData/getGeographicLocations')
const getIdentifiers = require('../searchData/getIdentifiers')
const getLanguages = require('../searchData/getLanguages')
const getKeywordsFromSubjects = require('../searchData/getKeywordsFromSubjects')
const getThumbnail = require('../searchData/getThumbnail')

module.exports = async (item) => {
  const dateData = realDatesFromCatalogedDates(item.createdDate)
  const creators = getCreators(item)
  const themes = getKeywordsFromSubjects(item)
  const allMetadataKeys = [
    'description', 'dimensions', 'language', 'license', 'access', 'format', 'dedication', 'medium', 'classification', 'workType',
  ]

  const searchData = {
    id: item.id,
    name: item.title,
    creator: creators,
    collection: item.collectionId,
    parent: item.parentId,
    identifier: getIdentifiers(item),
    geographicLocation: getGeographicLocations(item),
    repository: determineProvider(item),
    themeTag: themes.themeTag,
    expandedThemeTag: themes.expandedThemeTag,
    centuryTag: dateData.centuryTags,
    date: item.createdDate,
    lowestSearchRange: dateData.undated ? 500000 : dateData.lowestSearchRange,
    highestSearchRange: dateData.undated ? 500000 : dateData.highestSearchRange,
    workType: [item.workType],
    thumbnail: getThumbnail(item),
    language: getLanguages(item),
    type: item.level,
    url: '/item/' + item.id,
  }

  if (item.workType) {
    searchData.formatTag = [item.workType]
  }

  searchData.allMetadata = []
  allMetadataKeys.forEach((key) => {
    if (item[key]) {
      searchData.allMetadata.push(item[key])
    }
  })
  // searchData.allMetadata = searchData.allMetadata.concat(loadSubItemTitles(item))
  searchData.allMetadata = searchData.allMetadata.concat(searchData.centuryTag)
  searchData.allMetadata = searchData.allMetadata.concat(searchData.themeTag)
  searchData.allMetadata = searchData.allMetadata.concat(searchData.expandedThemeTag)

  return searchData
}
