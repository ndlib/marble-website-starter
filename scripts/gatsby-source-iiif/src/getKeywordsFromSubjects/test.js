const getKeywordsFromSubjects = require('./')

test('returns the term from a subject', () => {
  const manifest = {
    subjects: [{
      term: 'term',
    }],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(['term'])
})

test('returns the multiple terms from multiple subjects', () => {
  const manifest = {
    subjects: [
      { term: 'term1' },
      { term: 'term2' },
    ],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(['term1', 'term2'])
})

test('works with json encoded in a string', () => {
  const manifest = {
    subjects: JSON.stringify([
      { term: 'term1' },
      { term: 'term2' },
    ]),
  }

  expect(getKeywordsFromSubjects(manifest)).toEqual(['term1', 'term2'])
})

test('it returns empty if there are no subjects', () => {
  const manifest = {}
  expect(getKeywordsFromSubjects(manifest)).toEqual([])
})
