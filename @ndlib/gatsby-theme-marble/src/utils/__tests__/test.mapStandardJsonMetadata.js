import mapStandardJsonMetadata from '../mapStandardJsonMetadata'

describe('mapStandardJsonMetadata', () => {
  test('maps the title', () => {
    const standardJson = { title: 'title' }
    const result = mapStandardJsonMetadata(standardJson)
    expect(result.title).toEqual('title')
  })

  test('maps description when it exists', () => {
    const standardJson = { title: 'title', description: 'description' }
    const result = mapStandardJsonMetadata(standardJson)
    expect(result.description).toEqual('description')
  })

  test('maps blank description when it does not exist', () => {
    const standardJson = { title: 'title' }
    const result = mapStandardJsonMetadata(standardJson)
    expect(result.description).toEqual('')
  })
})
