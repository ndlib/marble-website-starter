const getKeywordsFromSubjects = require('./')

test('returns the term from a subject', () => {
  const manifest = {
    subjects: [{
      display: 'term',
    }],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(['term'])
})

test('returns the multiple terms from multiple subjects', () => {
  const manifest = {
    subjects: [
      { display: 'term1' },
      { display: 'term2' },
    ],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(['term1', 'term2'])
})

test('returns the empty if there is no display', () => {
  const manifest = {
    subjects: [
      { term: 'term1' },
    ],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual([])
})

test('works with json encoded in a string', () => {
  const manifest = {
    subjects: JSON.stringify([
      { display: 'term1' },
      { display: 'term2' },
    ]),
  }

  expect(getKeywordsFromSubjects(manifest)).toEqual(['term1', 'term2'])
})

test('it returns empty if there are no subjects', () => {
  const manifest = {}
  expect(getKeywordsFromSubjects(manifest)).toEqual([])
})

test('it splits on the dashes', () => {
  const manifest = {
    subjects: JSON.stringify([
      { display: 'term1 -- term2' },
      { display: 'term3' },
    ]),
  }

  expect(getKeywordsFromSubjects(manifest)).toEqual(['term1', 'term2', 'term3'])
})

test('it adds in the broaderTerms', () => {
  const manifest = {
    subjects: JSON.stringify([
      {
        display: 'term1',
        broaderTerms: [
          { display: ' term2 ' },
        ],
      },
      { display: 'term3' },
    ]),
  }

  expect(getKeywordsFromSubjects(manifest)).toEqual(['term1', 'term2', 'term3'])
})

test('it adds in the variantTerms', () => {
  const manifest = {
    subjects: JSON.stringify([
      {
        display: ' term1 ',
        variants: [' term2 '],
      },
      { display: 'term3' },
    ]),
  }

  expect(getKeywordsFromSubjects(manifest)).toEqual(['term1', 'term2', 'term3'])
})
