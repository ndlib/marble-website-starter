
const getCreators = require('./')

test('it collapses the display', () => {
  const creators = [
    { display: 'name1', firstname: 'fname' },
    { display: 'name2', firstname: 'fname2' },
  ]

  expect(getCreators(creators)).toEqual(['name1', 'name2'])
})

test('it handles missing display fields', () => {
  const creators = [
    { display: 'name1', firstname: 'fname' },
    { firstname: 'fname2' },
  ]

  expect(getCreators(creators)).toEqual(['name1'])
})

test('it removes empty fields', () => {
  const creators = [
    { display: 'name1', firstname: 'fname' },
    { display: '', firstname: 'fname2' },
  ]

  expect(getCreators(creators)).toEqual(['name1'])
})
