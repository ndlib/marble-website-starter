const realDatesFromCatalogedDates = require('./')

test('takes a string year(s) and gets a highest and lowest values for it', () => {
  [
    ['1790-1890', 1790, 1890],
    ['19--?', 1900, 1999],
    ['[19--?].', 1900, 1999],
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

test('It sets circa for circa dates', () => {
  // test undated
  [
    ['ca. 1899-1900', ['ca. 1899-1900', '1450'], 'c. 1523-3212'],
  ].forEach((testData) => {
    const result = realDatesFromCatalogedDates(testData[0])
    expect(result.circa).toEqual(true)
  })
})

test('takes a string year and gets a tag for it', () => {
  [
    ['1790-1890', ['1700-1799', '1800-1899']],
    ['1937.', ['1900-1999']],
    ['ca. 1899-1900', ['1800-1899', '1900-1999']],
    ['19--?', ['1900-1999']],
    ['[19--?].', ['1900-1999']],
    ['176-?', ['1700-1799']],
    [1342, ['1300-1399']],
    ['1900', ['1900-1999']],
    ['1899', ['1800-1899']],
    ['2003', ['2000-present']],
    ['', ['undated']],
    [null, ['undated']],
    [[], ['undated']],
    [['1937.'], ['1900-1999']], // takes dates in an array form
    [['ca. 1899-1900'], ['1800-1899', '1900-1999']],
    ['not a recognized date', ['undated']],
    ['1745-1750; 1780; 1790-1800', ['1700-1799', '1800-1899']],
    // awaiting the meeting to discuss.
    // [['0'], ['1st Century']],
    [['1950', 1970, '2001'], ['1900-1999', '2000-present']],
    [['mid-1900-1999'], ['1900-1999']],
    [['no date'], ['undated']],
    ['250-400', ['200-299', '300-399', '400-499']],

  ].forEach((testData) => {
    const result = realDatesFromCatalogedDates(testData[0])
    expect(result.centuryTags).toEqual(testData[1])
  })
})
