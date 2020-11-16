
import pruneEmptyLeaves from '../pruneEmptyLeaves'
const savedFixtureData = require('./fixtures/simple_prune.json')
const bigFixtureData = require('./fixtures/CFJ_EAD.json')
let fixtureData = {}

describe('mapStandardJsonMetadata', () => {
  beforeEach(() => {
    fixtureData = { ...savedFixtureData }
  })

  test('it should remove empty first level records', () => {
    expect(fixtureData.items.map((item) => item.title)).toContain('should be removed')
    pruneEmptyLeaves(fixtureData)
    expect(fixtureData.items.map((item) => item.title)).not.toContain('should be removed')
  })

  test('it should remove empty multi level records', () => {
    expect(fixtureData.items.map((item) => item.title)).toContain('multilevel-removed')
    pruneEmptyLeaves(fixtureData)
    expect(fixtureData.items.map((item) => item.title)).not.toContain('multilevel-removed')
  })

  test('it should compact (remove middle levels when there is one middle level a manifest/collection below it)', () => {
    pruneEmptyLeaves(fixtureData)
    const item = fixtureData.items.find((item) => item.title === 'collapse-middle')
    expect(item.items[0].title).toEqual('collapse-middle-level-withmanifest3')
  })

  test('big data', () => {
    console.log('here---->')
    pruneEmptyLeaves(bigFixtureData)
    console.log(bigFixtureData.items[0])
  })
})
