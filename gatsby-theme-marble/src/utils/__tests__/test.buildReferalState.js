import buildReferalState from '../buildReferalState'

describe('buildReferalState', () => {
  test('empty', () => {
    const nullResult = buildReferalState(null, null)
    expect(nullResult).toEqual(null)
  })
  test('referal', () => {
    const result = buildReferalState({ some: 'location' }, { my: 'referal' })
    expect(result).toEqual({ referal: { my: 'referal' } })
  })
})
