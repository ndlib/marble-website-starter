const findThumbnail = require('./')

test('it returns it from the iiifImageUri', () => {
  const manifest = {
    iiifImageUri: 'image!',
  }

  expect(findThumbnail(manifest)).toEqual('image!/full/!250,250/0/default.jpg')
})

test('it searchs down an item tree', () => {
  const manifest = {
    items: [
      {
        items: [
          { iiifImageUri: 'downimage!' },
        ],
      },
    ],
  }
  expect(findThumbnail(manifest)).toEqual('downimage!/full/!250,250/0/default.jpg')
})

test('it returns the first one in a list down an item tree', () => {
  const manifest = {
    items: [
      {
        items: [
          { iiifImageUri: 'downimage!' },
          { iiifImageUri: 'not this one!' },
        ],
      },
    ],
  }
  expect(findThumbnail(manifest)).toEqual('downimage!/full/!250,250/0/default.jpg')
})

test('it emtpy if there is no image', () => {
  const manifest = {
    items: [
      {
        items: [
          { name: 'downimage!' },
          { name: 'not this one!' },
        ],
      },
    ],
  }
  expect(findThumbnail(manifest)).toEqual(' ')
})
