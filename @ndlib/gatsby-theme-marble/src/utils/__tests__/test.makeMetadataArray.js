import makeMetadataArray from '../mapStandardJson/makeMetadataArray'

let defaultData = {}

describe('makeMetadataArray', () => {
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
          urlField: 'creator',
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
          display: 'Songs--Irish',
          uri: '',
        },
        {
          authority: 'lcsh',
          display: 'Ballads, Irish',
          uri: '',
        },
      ]
      const test = [
        {
          label: 'Subject',
          type: 'searchList',
          urlField: 'keywords',
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
      defaultData.publishers = [{
        publisherName: 'Bob',
        publisherLocation: 'Somewhere',
        display: 'Bob Somewhere',
      }]
      defaultData.sourceSystem = 'aleph'
      const test = [
        {
          label: 'Publisher',
          type: 'list',
          value:  [
            'Bob Somewhere',
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
          urlField: undefined,
          value:  [
            'Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame',
          ],
        },
        {
          label: 'URI Value',
          type: 'markdown',
          urlField: undefined,
          value: ['Rare%20Books%20%26%20Special%20Collections'],
        },
        {
          label: 'Contact Us',
          type: 'markdown',
          urlField: undefined,
          value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame at [rarebook@nd.edu](mailto:rarebook@nd.edu).'],
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
            'Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame',
          ],
        },
        {
          label: 'URI Value',
          type: 'markdown',
          urlField: undefined,
          value: ['Rare%20Books%20%26%20Special%20Collections'],
        },
        {
          label: 'Contact Us',
          type: 'markdown',
          urlField: undefined,
          value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame at [rarebook@nd.edu](mailto:rarebook@nd.edu).'],
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
            'Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame',
          ],
        },
        {
          label: 'URI Value',
          type: 'markdown',
          urlField: undefined,
          value: ['Rare%20Books%20%26%20Special%20Collections'],
        },
        {
          label: 'Contact Us',
          type: 'markdown',
          urlField: undefined,
          value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame at [rarebook@nd.edu](mailto:rarebook@nd.edu).'],
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
          urlField: undefined,
          value:  [
            'University of Notre Dame Archives, Hesburgh Libraries, University of Notre Dame',
          ],
        },
        {
          label: 'URI Value',
          type: 'markdown',
          urlField: undefined,
          value: ['University%20Archives'],
        },
        {
          label: 'Contact Us',
          type: 'markdown',
          urlField: undefined,
          value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact University of Notre Dame Archives, Hesburgh Libraries, University of Notre Dame at [archives@nd.edu](mailto:archives@nd.edu).'],
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
          urlField: undefined,
          value:  [
            'Snite Museum of Art',
          ],
        },
        {
          label: 'URI Value',
          type: 'markdown',
          urlField: undefined,
          value: ['Snite%20Museum%20of%20Art'],
        },
        {
          label: 'Contact Us',
          type: 'markdown',
          urlField: undefined,
          value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact Snite Museum of Art at [sniteart@nd.edu](mailto:sniteart@nd.edu).'],
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
        urlField: undefined,
        value:  [
          'General Collection, Hesburgh Libraries',
        ],
      },
      {
        label: 'URI Value',
        type: 'markdown',
        urlField: undefined,
        value: ['General%20Collection%2C%20Hesburgh%20Libraries'],
      },
      {
        label: 'Contact Us',
        type: 'markdown',
        urlField: undefined,
        value: ['Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact General Collection, Hesburgh Libraries at [asklib@nd.edu](mailto:asklib@nd.edu).'],
      },
    ]
    const result = makeMetadataArray(defaultData)
    expect(result).toEqual(test)
  })

  describe('language code mappings', () => {
    test('maps eng', () => {
      defaultData.languages = [{ display: 'English' }]
      const test = [
        {
          label: 'Language',
          type: 'searchList',
          urlField: 'language',
          value:  [
            'English',
          ],
        },
      ]

      const result = makeMetadataArray(defaultData)
      expect(result).toEqual(test)
    })

    test('maps rus', () => {
      defaultData.languages = [{ display: 'Russian' }]
      const test = [
        {
          label: 'Language',
          type: 'searchList',
          urlField: 'language',
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
  })
})
