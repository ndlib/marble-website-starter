const punctuationStripper = require('./')

test('punctuationStripper', () => {
  const testString = '   a. '
  const result = punctuationStripper(testString)
  expect(result).toEqual('a')
})
