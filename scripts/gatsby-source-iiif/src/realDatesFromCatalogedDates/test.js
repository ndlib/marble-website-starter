const realDatesFromCatalogedDates = require('./')

test('takes a string year and gets a tag for it', () => {
  [
    /*
    ['1790-1890', '18th Century', '19th Century'],
    ['1937.', '20th Century'],
    ['ca. 1899-1900', '19th Century', '20th Century'],
    ['19--?', '20th Century'],
    ['176-?', '18th Century'],
    [1342, '14th Century'],
    ['1900', '20th Century'],
    ['1899', '19th Century'],
    ['2003', '21st Century'],
    ['', 'undated'],
    [null, 'undated'],
    [[], 'undated'],
    [['1937.'], '20th Century'], // takes dates in an array form
    [['ca. 1899-1900'], '19th Century', '20th Century'],
    ['not a recognized date', 'undated'],
    ['250-400', '3rd Century', '4th Century', '5th Century'],
    */

    // awaiting the meeting to discuss.
    // ['0'], '1st Century']
    // ['1950', 1970, '2001'], '20th Century', 21st Century']
    // ['mid-20th Century'], '20th Century']
    // ['no date'], 'undated']
    ['1790-1890', 1790, 1890],
    ['19--?', 1900, 1999],
    ['1745-1750; 1780; 1790-1800', 1745, 1800],
    ['ca. 1899-1900', 1899, 1900],
    [1342, 1342, 1342],
    ['1900', 1900, 1900],
    ['250-400', 250, 400],
    ['20th Century', 1900, 1999],
    ['1st century', 0, 99],
    ['2nd Century', 100, 199],
    ['3rd Century', 200, 299],
    ['mid-14th Century', 1333, 1366],
    ['late 5th Century', 467, 499],
    ['early 9th Century', 800, 832],
    ['', 50000, -50000],
  ].forEach((testData) => {
    const result = realDatesFromCatalogedDates(testData[0])
    expect(result.lowestSearchRange).toEqual(testData[1])
    expect(result.highestSearchRange).toEqual(testData[2])
  })
})

test('It sets undated for undated dates', () => {
  // test undated
  [
    ['', 'undated'],
    [null, 'undated'],
    [[], 'undated'],
    ['not a recognized date', ['undated']],
  ].forEach((testData) => {
    const result = realDatesFromCatalogedDates(testData[0])
    expect(result.undated).toEqual(true)
  })
})

test('takes a string year and gets a tag for it', () => {
  [
    ['1790-1890', ['18th Century', '19th Century']],
    ['1937.', ['20th Century']],
    ['ca. 1899-1900', ['19th Century', '20th Century']],
    ['19--?', ['20th Century']],
    ['176-?', ['18th Century']],
    [1342, ['14th Century']],
    ['1900', ['20th Century']],
    ['1899', ['19th Century']],
    ['2003', ['21st Century']],
    ['', ['undated']],
    [null, ['undated']],
    [[], ['undated']],
    [['1937.'], ['20th Century']], // takes dates in an array form
    [['ca. 1899-1900'], ['19th Century', '20th Century']],
    ['not a recognized date', ['undated']],
    ['1745-1750; 1780; 1790-1800', ['18th Century', '19th Century']],
    // awaiting the meeting to discuss.
    // [['0'], ['1st Century']],
    [['1950', 1970, '2001'], ['20th Century', '21st Century']],
    [['mid-20th Century'], ['20th Century']],
    [['no date'], ['undated']],
    ['250-400', ['3rd Century', '4th Century', '5th Century']],

  ].forEach((testData) => {
    const result = realDatesFromCatalogedDates(testData[0])
    expect(result.centuryTags).toEqual(testData[1])
  })
})
