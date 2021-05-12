const getIiif = require('./')

describe('getIiif', () => {
  test('type === image', () => {
    const item = {
      mimeType: 'image/jpg',
      mediaServer: 'https://media-server.com',
      mediaResourceId: 'abc',
    }
    const result = getIiif(item)
    expect(result).toEqual({
      default: 'https://media-server.com/abc/full/full/0/default.jpg',
      service: 'https://media-server.com/abc',
      thumbnail: 'https://media-server.com/abc/full/!250,250/0/default.jpg',
    })
  })
  test('type !== image', () => {
    const item = {
      mimeType: 'application/json',
      mediaServer: 'https://media-server.com',
      mediaResourceId: 'abc',
    }
    const result = getIiif(item)
    expect(result).toEqual(null)
  })
})
