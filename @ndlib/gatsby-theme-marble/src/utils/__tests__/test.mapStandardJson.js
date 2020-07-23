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
})
