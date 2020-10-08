const citationGenerator = require('../mapStandardJson/citationGenerator')

let defaultData = {}

describe('citationGenerator', () => {
  beforeEach(() => {
    defaultData = {
    }
  })

  test('returns empty string if it is a file standardJson', () => {
    defaultData.level = 'file'
    expect(citationGenerator(defaultData)).toEqual('')
  })

  describe('citationGenerator calling subfunctions', () => {
    test('museum response received', () => {
      defaultData.repository = 'museum'
      const test = 'artist!, title, date, medium. Snite Museum of Art, University of Notre Dame. credit line, accession number.'
      defaultData.title = 'title'
      defaultData.createdDate = 'date'
      defaultData.medium = 'medium'
      defaultData.dedication = 'credit line'
      defaultData.uniqueIdentifier = 'accession number'
      defaultData.creators = [{ fullName: 'artist!' }]

      const callGenerator = citationGenerator(defaultData, 'slug')
      expect(callGenerator).toEqual(test)
    })
    test('rare response received', () => {
      const test = 'collection name, identifier. Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame, South Bend, IN. https://marble.nd.edu/slug.'
      defaultData.title = 'collection name'
      defaultData.uniqueIdentifier = 'identifier'
      defaultData.repository = 'rare'

      const callGenerator = citationGenerator(defaultData, 'slug')
      expect(callGenerator).toEqual(test)
    })
    test('unda response received', () => {
      const test = 'collection name, identifier. University Archives, Hesburgh Libraries, University of Notre Dame, South Bend, IN. https://marble.nd.edu/slug.'
      defaultData.title = 'collection name'
      defaultData.uniqueIdentifier = 'identifier'
      defaultData.repository = 'unda'

      const callGenerator = citationGenerator(defaultData, 'slug')
      expect(callGenerator).toEqual(test)
    })
  })
})
