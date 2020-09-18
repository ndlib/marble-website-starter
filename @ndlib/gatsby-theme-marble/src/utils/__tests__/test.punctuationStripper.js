import punctuationStripper from '../mapStandardJson/punctuationStripper'

describe('mapStandardJsonMetadata', () => {
  test('it strips each of the known examples', () => {
    [
      ['[brackets around date]', 'brackets around date'],
      ['brackets in [text] somewhere', 'brackets in text somewhere'],
      ['slash / at end /', 'slash / at end'],
      ['colon: at the end :', 'colon: at the end'],
      ['semi-colon; at the end ;', 'semi-colon; at the end'],
      ['period. at the end.', 'period. at the end'],
      ['comma, at the end,', 'comma, at the end'],
    ].forEach(row => {
      expect(punctuationStripper(row[0])).toEqual(punctuationStripper(row[1]))
    })
  })

  test('it strips whitespace off the end', () => {
    expect(punctuationStripper('stripped space ')).toEqual('stripped space')
  })

  test('it strips whitespace off the end of another strip', () => {
    expect(punctuationStripper('stripped space :')).toEqual('stripped space')
  })
})
