const getLanguages = require('./')

test('it uses the display', () => {
  const languages = [
    { display: 'English', alpha2: 'en', alpha3: 'eng' },
    { display: 'Spanish', alpha2: 'sp', alpha3: 'spa' },
  ]
  const manifest = {
    languages: languages,
  }
  expect(getLanguages(manifest)).toEqual(['English', 'Spanish'])
})

test('it skips if there is no display', () => {
  const languages = [
    { display: 'English', alpha2: 'en', alpha3: 'eng' },
    { alpha2: 'sp', alpha3: 'spa' },
  ]
  const manifest = {
    languages: languages,
  }
  expect(getLanguages(manifest)).toEqual(['English'])
})

test('it is empty if there is no languages', () => {
  const languages = [
    { display: 'English', alpha2: 'en', alpha3: 'eng' },
    { alpha2: 'sp', alpha3: 'spa' },
  ]
  const manifest = {
    language: languages,
  }
  expect(getLanguages(manifest)).toEqual([])
})
