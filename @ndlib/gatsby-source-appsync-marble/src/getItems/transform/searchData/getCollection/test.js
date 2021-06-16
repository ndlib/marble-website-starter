
const getCollection = require('./')

test('it finds collections in the app sync collection field', () => {
  const item = {
    collections: [
      { display: 'collection:)' },
    ],
  }

  expect(getCollection(item)).toEqual(['collection:)'])
})

test('it finds multiple collections in the app sync collection field', () => {
  const item = {
    collections: [
      { display: 'collection:)' },
      { display: 'collection2' },
    ],
  }

  expect(getCollection(item)).toEqual(['collection:)', 'collection2'])
})

test('it finds items in the parent field', () => {
  const item = {
    parent: {
      title: 'collection!',
      level: 'collection',
      parent: {
        title: 'another',
        level: 'collection',
      },
    },
  }

  expect(getCollection(item)).toEqual(['collection!', 'another'])
})
