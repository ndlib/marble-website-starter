const getCenturyTags = require('./')

test('takes a string year and gets a tag for it', () => {
  [
    ['1790-1890', ['18th Century', '19th Century']],
    ['1937.', ['20th Century']],
    ['ca. 1899-1900', ['19th Century', '20th Century']],
    ['19--?', ['20th Century']],
    ['176-?', ['18th Century']],
    [1342, ['14th Century']],
    ['1900', ['20th Century']],
    ['2003', ['21st Century']],
    ['', ['undated']],
    [null, ['undated']],
    [[], ['undated']],
    [['1937.'], ['20th Century']], // takes dates in an array form
    [['ca. 1899-1900'], ['19th Century', '20th Century']],
    ['not a recognized date', ['undated']],
    // awaiting the meeting to discuss.
    // ['250-400', ['3rd Century', '4th Century', '5th Century']],
    // ['0'], ['1st Century']
    // ['1950', 1970, '2001'], ['20th Century', 21st Century']
    // ['mid-20th Century'], ['20th Century']
    // ['no date'], ['undated']

  ].forEach((testData) => {
    expect(getCenturyTags(testData[0])).toEqual(testData[1])
  })
})
