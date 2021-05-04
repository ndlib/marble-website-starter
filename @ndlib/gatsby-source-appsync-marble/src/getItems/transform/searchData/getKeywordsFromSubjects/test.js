const getKeywordsFromSubjects = require('./')

test('returns the term from a subject', () => {
  const manifest = {
    subjects: [{
      display: 'term',
    }],
  }
  const test = {
    themeTag: ['term'],
    expandedThemeTag: [],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})

test('returns the multiple terms from multiple subjects', () => {
  const manifest = {
    subjects: [
      { display: 'term1' },
      { display: 'term2' },
    ],
  }
  const test = {
    themeTag: ['term1', 'term2'],
    expandedThemeTag: [],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})

test('returns the empty if there is no display', () => {
  const manifest = {
    subjects: [
      { term: 'term1' },
    ],
  }
  const test = {
    themeTag: [],
    expandedThemeTag: [],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})

test('works with json encoded in a string', () => {
  const manifest = {
    subjects: JSON.stringify([
      { display: 'term1' },
      { display: 'term2' },
    ]),
  }

  const test = {
    themeTag: ['term1', 'term2'],
    expandedThemeTag: [],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})

test('it returns empty if there are no subjects', () => {
  const manifest = {}
  const test = {
    themeTag: [],
    expandedThemeTag: [],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})

test('it splits on the dashes', () => {
  const manifest = {
    subjects: JSON.stringify([
      { display: 'term1 -- term2' },
      { display: 'term3' },
    ]),
  }
  const test = {
    themeTag: ['term1', 'term2', 'term3'],
    expandedThemeTag: [],
  }

  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
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

  const test = {
    themeTag: ['term1', 'term3'],
    expandedThemeTag: ['term2'],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})

test('it splits the broaderTerms', () => {
  const manifest = {
    subjects: JSON.stringify([
      {
        display: 'term1',
        broaderTerms: [
          { display: ' term2 -- term3 ' },
        ],
      },
    ]),
  }

  const test = {
    themeTag: ['term1'],
    expandedThemeTag: ['term2', 'term3'],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
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

  const test = {
    themeTag: ['term1', 'term3'],
    expandedThemeTag: ['term2'],
  }
  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})

test('it makes unique values out of the list', () => {
  const manifest = {
    subjects: JSON.stringify([
      {
        display: ' term1 ',
        variants: [' term2 '],
      },
      {
        display: 'term1',
        variants: ['term2'],
      },
    ]),
  }
  const test = {
    themeTag: ['term1'],
    expandedThemeTag: ['term2'],
  }

  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})

test('it removes 4 diget dates that are the only subject', () => {
  const manifest = {
    subjects: JSON.stringify([
      {
        display: ' 1643 ',
        variants: [' 1642 '],
      },
      {
        display: 'term3',
        variants: [' term3 '],
      },
    ]),
  }

  const test = {
    themeTag: ['term3'],
    expandedThemeTag: ['term3'],
  }

  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})

test('it removes 4 diget dashed dates from nested subjects', () => {
  const manifest = {
    subjects: JSON.stringify([
      {
        display: '-1643 ',
        variants: [' -1642 '],
      },
      {
        display: 'term3',
        variants: [' term3 '],
      },
    ]),
  }

  const test = {
    themeTag: ['term3'],
    expandedThemeTag: ['term3'],
  }

  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})

test('it removes duplicates in split subjects', () => {
  const manifest = {
    subjects: JSON.stringify([
      {
        display: 'Songs -- Peru -- Texts',
      },
      {
        display: 'Popular music -- Peru',
      },
    ]),
  }

  const test = {
    themeTag: ['Songs', 'Peru', 'Texts', 'Popular music'],
    expandedThemeTag: [],
  }

  expect(getKeywordsFromSubjects(manifest)).toEqual(test)
})
