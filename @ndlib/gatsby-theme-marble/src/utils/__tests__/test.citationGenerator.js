import { citationGenerator, museumCitation, archivalCollectionCitation } from '../mapStandardJson/citationGenerator'

let defaultData = {}

describe('citationGenerator', () => {
  beforeEach(() => {
    defaultData = {
    }
  })

  test('returns empty string if it is a file standardJson', () => {
    defaultData['level'] = 'file'
    expect(citationGenerator(defaultData)).toEqual('')
  })

  describe('museum citation', () => {
    const test = 'artist!, title, date, medium. Snite Museum of Art, University of Notre Dame. credit line, accession number.'
    defaultData['title'] = 'title'
    defaultData['createdDate'] = 'date'
    defaultData['medium'] = 'medium'
    defaultData['dedication'] = 'credit line'
    defaultData['uniqueIdentifier'] = 'accession number'
    defaultData['creators'] = [{ fullName: 'artist!' }]

    expect(museumCitation(defaultData)).toEqual(test)
  })
  // Collection name, Identifier. Repository [Rare Books and Special Collections or University of Notre Dame Archives], Hesburgh Libraries, University of Notre Dame, South Bend, IN. URL for Marble item

  describe('archival citation', () => {
    test('RBSC item', () => {
      const test = 'collection name, identifier. Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame, South Bend, IN. https://marble.nd.edu/slug.'
      defaultData['title'] = 'collection name'
      defaultData['uniqueIdentifier'] = 'identifier'
      defaultData['repository'] = 'rare'

      expect(archivalCollectionCitation(defaultData, 'slug')).toEqual(test)
    })

    test('unda item', () => {
      const test = 'collection name, identifier. University Archives, Hesburgh Libraries, University of Notre Dame, South Bend, IN. https://marble.nd.edu/slug.'
      defaultData['title'] = 'collection name'
      defaultData['uniqueIdentifier'] = 'identifier'
      defaultData['repository'] = 'unda'

      expect(archivalCollectionCitation(defaultData, 'slug')).toEqual(test)
    })
  })
})
