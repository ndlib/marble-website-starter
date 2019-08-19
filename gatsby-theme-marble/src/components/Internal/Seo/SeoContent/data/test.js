import {
  dropEmpty,
  getOpenGraph,
  getTwitter,
} from './'

test('dropEmpty', () => {
  const arr = [
    { thing: 1 },
    { thing: 2, content: 'yes' },
    { thing: 3, content: '' },
    { thing: 4, content: 'yep' },
    { thing: 5, content: null },
  ]
  const expected = [
    { thing: 2, content: 'yes' },
    { thing: 4, content: 'yep' },
  ]
  const actual = dropEmpty(arr)
  expect(actual).toEqual(expected)
})

test('getOpenGraph', () => {
  const expected = [
    {
      property: `og:title`,
      content: 'My Title',
    },
    {
      property: `og:description`,
      content: 'My Description',
    },
    {
      property: `og:image`,
      content: '/my-image.png',
    },
    {
      property: `og:type`,
      content: `website`,
    },
  ]
  const actual = getOpenGraph('My Title', 'My Description', '/my-image.png')
  expect(actual).toEqual(expected)
})

test('getTwitter', () => {
  const expected = [
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: 'Some Guy',
    },
    {
      name: `twitter:title`,
      content: 'Twitter Title',
    },
    {
      name: `twitter:description`,
      content: 'Twitter Description',
    },
    {
      name: `twitter:image`,
      content: '/twitter.jpg',
    },
  ]
  const actual = getTwitter('Some Guy', 'Twitter Title', 'Twitter Description', '/twitter.jpg')
  expect(actual).toEqual(expected)
})
