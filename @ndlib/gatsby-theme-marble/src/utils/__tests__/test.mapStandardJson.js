import mapStandardJsonMetadata from '../mapStandardJson'

let defaultData = {}

describe('mapStandardJsonMetadata', () => {
  beforeEach(() => {
    defaultData = {
      sourceSystem: 'archivesspace',
      id: 'id',
      title: 'title',
      level: 'manifest',
    }
  })

  test('maps the title', () => {
    defaultData.title = 'new title'
    const result = mapStandardJsonMetadata(defaultData)
    expect(result.title).toEqual('new title')
  })

  test('maps a slug', () => {
    const result = mapStandardJsonMetadata(defaultData)
    expect(result.slug).toEqual('item/id')
  })

  describe('description', () => {
    test('maps blank when it does not exist', () => {
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.description).toEqual('')
    })

    test('mapped correctly', () => {
      defaultData.description = 'description'
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.description).toEqual('description')
    })
  })

  test('display mapped correctly', () => {
    defaultData.level = 'collection'
    const result = mapStandardJsonMetadata(defaultData)
    expect(result.display).toEqual('collection')
  })

  describe('copyrightRestricted', () => {
    test('true if the standard json says it is copyright', () => {
      defaultData.copyrightStatus = 'copyright'
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.copyrightRestricted).toEqual(true)
    })

    test('true if the standard json says it is Copyright', () => {
      defaultData.copyrightStatus = 'Copyright'
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.copyrightRestricted).toEqual(true)
    })

    test('false if the standard json says it is not copyright', () => {
      defaultData.copyrightStatus = 'not copyright'
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.copyrightRestricted).toEqual(false)
    })
  })

  describe('iiifUrl', () => {
    test('maps blank when it does not exist', () => {
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.iiifUri).toEqual('')
    })

    test('mapped correctly', () => {
      defaultData.iiifUri = 'https://url.com'
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.iiifUri).toEqual('https://url.com')
    })
  })

  describe('partiallyDigitized', () => {
    test('defaults to false if it is not there', () => {
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.partiallyDigitized).toEqual(false)
    })

    test('mapped correctly', () => {
      defaultData.partiallyDigitized = true
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.partiallyDigitized).toEqual(true)
    })
  })

  describe('metadata', () => {
    describe('creators', () => {
      test('defaults to empty if it is not there', () => {
        const result = mapStandardJsonMetadata(defaultData)
        expect(result.metadata).toEqual([])
      })

      test('sets the creator data', () => {
        defaultData.creators = [
          { display: 'CREATOR!!!' },
          { display: 'CREATOR2' },
        ]
        const test = [
          {
            label: 'Creator',
            type: 'list',
            value:  [
              'CREATOR!!!',
              'CREATOR2',
            ],
          },
        ]
        const result = mapStandardJsonMetadata(defaultData)
        expect(result.metadata).toEqual(test)
      })
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
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.metadata).toEqual(test)
    })

    test('does not return any metadata for date if date is set but empty', () => {
      defaultData.createdDate = ''
      const test = [
      ]
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.metadata).toEqual(test)
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
          type: 'list',
          value:  [
            'Songs--Irish',
            'Ballads, Irish',
          ],
        },
      ]
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.metadata).toEqual(test)
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
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.metadata).toEqual(test)
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
          value: ['Not every record you will find here is complete. More information is available for some works than for others, and some entries have been updated more recently. If you have spotted an error or have more information about this record, please contact the Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame at rarebook@nd.edu.'],
        },
      ]
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.metadata).toEqual(test)
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
          value: ['Not every record you will find here is complete. More information is available for some works than for others, and some entries have been updated more recently. If you have spotted an error or have more information about this record, please contact the Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame at rarebook@nd.edu.'],
        },
      ]
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.metadata).toEqual(test)
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
          value: ['Not every record you will find here is complete. More information is available for some works than for others, and some entries have been updated more recently. If you have spotted an error or have more information about this record, please contact the Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame at rarebook@nd.edu.'],
        },
      ]
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.metadata).toEqual(test)
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
          value: ['Not every record you will find here is complete. More information is available for some works than for others, and some entries have been updated more recently. If you have spotted an error or have more information about this record, please contact the University of Notre Dame Archives, Hesburgh Libraries, University of Notre Dame at archives@nd.edu.'],
        },
      ]
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.metadata).toEqual(test)
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
          value: ['Not every record you will find here is complete. More information is available for some works than for others, and some entries have been updated more recently. If you have spotted an error or have more information about this record, please contact the Snite Museum of Art at sniteart@nd.edu.'],
        },
      ]
      const result = mapStandardJsonMetadata(defaultData)
      expect(result.metadata).toEqual(test)
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
        value: ['Not every record you will find here is complete. More information is available for some works than for others, and some entries have been updated more recently. If you have spotted an error or have more information about this record, please contact the General Collection, Hesburgh Libraries at asklib@nd.edu.'],
      },
    ]
    const result = mapStandardJsonMetadata(defaultData)
    expect(result.metadata).toEqual(test)
  })
})
