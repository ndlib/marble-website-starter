import imageMetadata from '../mapStandardJson/imageMetadata'

let defaultData = []

describe('mapImageMetadata', () => {
  beforeEach(() => {
    defaultData = {
      level: 'file',
      iiifImageUri: 'https://image.server.com/iiif/file',
      sequence: 0,
      title: 'title',
      id: 'bob.jpg',
      collectionId: 'billy',
    }
  })

  test('it creates images data out of the file node', () => {
    const test = {
      default: 'https://image.server.com/iiif/file/full/full/0/default.jpg',
      service: 'https://image.server.com/iiif/file',
      thumbnail: 'https://image.server.com/iiif/file/full/400,/0/default.jpg',
      sequence: 0,
      title: 'title',
      name: 'billy-bob',
      extension: 'jpg',
    }

    const result = imageMetadata(defaultData)
    expect(result).toEqual(test)
  })
  test('jpeg', () => {
    defaultData.id = 'bob.jpeg'
    const jpeg = imageMetadata(defaultData)
    expect(jpeg.name).toEqual('billy-bob')
  })
  test('png', () => {
    defaultData.id = 'bob.png'
    const png = imageMetadata(defaultData)
    expect(png.name).toEqual('billy-bob')
  })
  test('tif', () => {
    defaultData.id = 'bob.tif'
    const tif = imageMetadata(defaultData)
    expect(tif.name).toEqual('billy-bob')
  })
  test('tiff', () => {
    defaultData.id = 'bob.tiff'
    const tiff = imageMetadata(defaultData)
    expect(tiff.name).toEqual('billy-bob')
  })
  test('file extension not in the list', () => {
    defaultData.id = 'bob.noExt'
    const noExt = imageMetadata(defaultData)
    expect(noExt.name).toEqual('billy-bob.noExt')
  })
})
