
const getCreators = require('./')

test('it collapses the display', () => {
  const creators = [
    { display: 'name1', firstname: 'fname' },
    { display: 'name2', firstname: 'fname2' },
  ]
  const manifest = {
    creators: creators,
  }
  expect(getCreators(manifest)).toEqual(['name1', 'name2'])
})

test('it handles missing display fields', () => {
  const creators = [
    { display: 'name1', firstname: 'fname' },
    { firstname: 'fname2' },
  ]

  const manifest = {
    creators: creators,
  }

  expect(getCreators(manifest)).toEqual(['name1'])
})

test('it removes empty fields', () => {
  const creators = [
    { display: 'name1', firstname: 'fname' },
    { display: '', firstname: 'fname2' },
  ]
  const manifest = {
    creators: creators,
  }

  expect(getCreators(manifest)).toEqual(['name1'])
})

test('creators array is empty', () => {
  const creators = []
  const manifest = {
    creators: creators,
  }

  expect(getCreators(manifest)).toEqual([])
})

test('creators and contriubres are merged', () => {
  const creators = [
    { display: 'name1', firstname: 'fname' },
  ]
  const contributors = [
    { display: 'name2', firstname: 'fname2' },
  ]

  const manifest = {
    creators: creators,
    contributors: contributors,
  }

  expect(getCreators(manifest)).toEqual(['name1', 'name2'])
})

test('creators is undefined', () => {
  expect(getCreators(undefined)).toEqual([])
  expect(getCreators('')).toEqual([])
})
