const citationGenerator = require('./')

describe('citationGenerator', () => {
  test('museum', () => {
    const item = {
      repository: 'museum',
      creators: [
        { fullName: 'Bradley Nowell' },
      ],
      title: 'Title',
      createdDate: 'April 29, 1992',
      medium: 'LP',
      dedication: 'My dalmation',
      uniqueIdentifier: 'Sublime',
    }
    const result = citationGenerator(item)
    expect(result).toEqual('Bradley Nowell, Title, April 29, 1992, LP. Snite Museum of Art, University of Notre Dame. My dalmation, Sublime.')
  })
  test('rare', () => {
    const item = {
      repository: 'rare',
      creators: [
        { fullName: 'Kurt Cobain' },
      ],
      title: 'Heart Shaped Box',
      uniqueIdentifier: 'Nirvana',
    }
    const result = citationGenerator(item, 'bleach')
    expect(result).toEqual('Heart Shaped Box, Nirvana. Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame, South Bend, IN. https://marble.nd.edu/bleach.')
  })
  test('none', () => {
    const item = {
      repository: '',
    }
    const result = citationGenerator(item)
    expect(result).toEqual('')
  })
})
