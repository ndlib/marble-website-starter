import mapStandardJsonMetadata from '../mapStandardJson'

let defaultData = {}

describe('mapStandardJsonMetadata', () => {
  beforeEach(() => {
    defaultData = {
      sourceSystem: 'archivesspace',
      title: 'title',
      level: 'manifest',
    }
  })

  test('maps the title', () => {
    defaultData.title = 'new title'
    const result = mapStandardJsonMetadata(defaultData)
    expect(result.title).toEqual('new title')
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
})
