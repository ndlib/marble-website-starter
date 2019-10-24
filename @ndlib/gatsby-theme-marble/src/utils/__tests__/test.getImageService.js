import { getImageService, getImageServiceFromThumbnail } from '../getImageService'

describe('getImageService', () => {
  const iiifManifest = {
    items: [{
      items: [{
        items: [{
          body: {
            service: [{ id: '/image/path.jpg' }],
          },
        }],
      }],
    }],
  }
  test('return url', () => {
    const result = getImageService(iiifManifest, 0)
    expect(result).toEqual('/image/path.jpg')
  })

  test('return null', () => {
    const result = getImageService(iiifManifest, 2)
    expect(result).toEqual(null)
  })
})

describe('getImageServiceFromThumbnail', () => {
  test('return url', () => {
    const iiifManifest = {
      thumbnail: [{
        service: [{
          id: '/image/path.jpg',
        }],
      }],
    }
    const result = getImageServiceFromThumbnail(iiifManifest)
    expect(result).toEqual('/image/path.jpg')
  })

  test('return null', () => {
    const result = getImageServiceFromThumbnail({})
    expect(result).toEqual(null)
  })
})
