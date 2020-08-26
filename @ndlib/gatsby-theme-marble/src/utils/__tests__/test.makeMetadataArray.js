import makeMetadataArray from '../mapStandardJson/makeMetadataArray'

let defaultData = {}

describe.skip('makeMetadataArray', () => {
  beforeEach(() => {
    defaultData = {
      sourceSystem: 'archivesspace',
      id: 'id',
      title: 'title',
      level: 'manifest',
    }
  })

  describe('creators', () => {
    test('defaults to empty if it is not there', () => {
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual([])
    })

    test('sets the creator data', () => {
      defaultData.creators = [
        { display: 'CREATOR!!!' },
        { display: 'CREATOR2' },
      ]
      const test = [
        {
          label: 'Creator',
          type: 'searchList',
          value:  [
            'CREATOR!!!',
            'CREATOR2',
          ],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })
  })

  describe('date', () => {
    test('sets the date', () => {
      defaultData.createdDate = 'date'
      const test = [
        {
          label: 'Date',
          type: 'list',
          value: ['date'],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })

    test('does not return any metadata for date if date is set but empty', () => {
      defaultData.createdDate = ''
      const test = [
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })
  })

  describe('subjects', () => {
    test('sets the subjects', () => {
      defaultData.subjects = [
        {
          authority: 'lcsh',
          term: 'Songs--Irish',
          uri: '',
        },
        {
          authority: 'lcsh',
          term: 'Ballads, Irish',
          uri: '',
        },
      ]
      const test = [
        {
          label: 'Subject',
          type: 'searchList',
          value:  [
            'Songs--Irish',
            'Ballads, Irish',
          ],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })
  })

  describe('publisher', () => {
    test('sets the publisher', () => {
      defaultData.publisher = {
        publisherName: 'Bob',
        publisherLocation: 'Somewhere',
      }
      defaultData.sourceSystem = 'aleph'
      const test = [
        {
          label: 'Publisher',
          type: 'list',
          value:  [
            'Bob',
          ],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })
  })

  describe('providers', () => {
    test('sets the provider for rare', () => {
      defaultData.repository = 'rare'
      const test = [
        {
          label: 'Campus Location',
          type: 'list',
          value:  [
            'Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame',
          ],
        },
        {
          label: 'Contact Us',
          type: 'list',
          value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame at rarebook@nd.edu.'],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })

    test('sets the provider for rare when it is capitalized', () => {
      defaultData.repository = 'RARE'
      const test = [
        {
          label: 'Campus Location',
          type: 'list',
          value:  [
            'Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame',
          ],
        },
        {
          label: 'Contact Us',
          type: 'list',
          value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame at rarebook@nd.edu.'],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })

    test('sets the provider for curate', () => {
      defaultData.repository = 'curate'
      const test = [
        {
          label: 'Campus Location',
          type: 'list',
          value:  [
            'Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame',
          ],
        },
        {
          label: 'Contact Us',
          type: 'list',
          value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame at rarebook@nd.edu.'],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })

    test('sets the provider for unda', () => {
      defaultData.repository = 'unda'
      const test = [
        {
          label: 'Campus Location',
          type: 'list',
          value:  [
            'University of Notre Dame Archives, Hesburgh Libraries, University of Notre Dame',
          ],
        },
        {
          label: 'Contact Us',
          type: 'list',
          value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact University of Notre Dame Archives, Hesburgh Libraries, University of Notre Dame at archives@nd.edu.'],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })

    test('sets the provider for museum', () => {
      defaultData.repository = 'museum'
      const test = [
        {
          label: 'Campus Location',
          type: 'list',
          value:  [
            'Snite Museum of Art',
          ],
        },
        {
          label: 'Contact Us',
          type: 'list',
          value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact Snite Museum of Art at sniteart@nd.edu.'],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })
  })

  test('sets the provider for hesb', () => {
    defaultData.repository = 'hesb'
    const test = [
      {
        label: 'Campus Location',
        type: 'list',
        value:  [
          'General Collection, Hesburgh Libraries',
        ],
      },
      {
        label: 'Contact Us',
        type: 'list',
        value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact General Collection, Hesburgh Libraries at asklib@nd.edu.'],
      },
    ]
    const result = makeMetadataArray(defaultData)
    expect(result).toEqual(test)
  })

  describe('language code mappings', () => {
    test('maps eng', () => {
      defaultData.languages = ['eng']
      const test = [
        {
          label: 'Language',
          type: 'searchList',
          value:  [
            'English',
          ],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })

    test('maps rus', () => {
      defaultData.languages = ['rus']
      const test = [
        {
          label: 'Language',
          type: 'searchList',
          value:  [
            'Russian',
          ],
        },
      ]
      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })

    test('maps nothing whene there is no field', () => {
      const test = []

      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })

    test('maps nothing whene there is no field', () => {
      defaultData.languages = ['xyz']
      const test = [
        {
          label: 'Language',
          type: 'searchList',
          value:  [
            'xyz',
          ],
        },
      ]

      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })
  })
})
