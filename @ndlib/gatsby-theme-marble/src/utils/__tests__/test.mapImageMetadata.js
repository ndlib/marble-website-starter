import imageMetadata from '../mapStandardJson/imageMetadata'

let defaultData = []

describe('mapImageMetadata', () => {
  beforeEach(() => {
    defaultData = {
      level: 'file',
      iiifImageUri: 'https://image.server.com/iiif/file',
      sequence: 0,
      title: 'title',
    }
  })

  test('it creates images data out of the file node', () => {
    const test = {
      default: 'https://image.server.com/iiif/file/full/full/0/default.jpg',
      service: 'https://image.server.com/iiif/file',
      thumbnail: 'https://image.server.com/iiif/file/full/400,/0/default.jpg',
      sequence: 0,
      title: 'title',
    }

    const result = imageMetadata(defaultData)
    expect(result).toEqual(test)
  })
})
