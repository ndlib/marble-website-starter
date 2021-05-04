module.exports = `
  query {
    allMarbleItem {
      nodes {
        searchData {
          id
          name
          creator
          collection
          parent
          identifier
          geographicLocation
          repository
          themeTag
          expandedThemeTag
          centuryTag
          date
          lowestSearchRange
          highestSearchRange
          workType
          thumbnail
          language
          type
          url
          formatTag
          allMetadata
        }
      }
    }
  }
`
