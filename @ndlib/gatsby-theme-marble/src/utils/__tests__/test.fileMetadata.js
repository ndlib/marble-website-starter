import fileMetadata from '../mapStandardJson/fileMetadata'

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
      iiif: {
        default: 'https://image.server.com/iiif/file/full/full/0/default.jpg',
        service: 'https://image.server.com/iiif/file',
        thumbnail: 'https://image.server.com/iiif/file/full/!250,250/0/default.jpg',
      },
      fileType: 'image',
      sequence: 0,
      title: 'title',
      name: 'billy-bob',
      extension: 'jpg',
      internal: {
        type: 'MarbleFile',
      },
    }

    const result = fileMetadata(defaultData)
    expect(result).toEqual(test)
  })
  test('jpeg', () => {
    defaultData.id = 'bob.jpeg'
    const jpeg = fileMetadata(defaultData)
    expect(jpeg.name).toEqual('billy-bob')
    expect(jpeg.fileType).toEqual('image')
  })
  test('png', () => {
    defaultData.id = 'bob.png'
    const png = fileMetadata(defaultData)
    expect(png.name).toEqual('billy-bob')
    expect(png.fileType).toEqual('image')
  })
  test('tif', () => {
    defaultData.id = 'bob.tif'
    const tif = fileMetadata(defaultData)
    expect(tif.name).toEqual('billy-bob')
    expect(tif.fileType).toEqual('image')
  })
  test('tiff', () => {
    defaultData.id = 'bob.tiff'
    const tiff = fileMetadata(defaultData)
    expect(tiff.name).toEqual('billy-bob')
    expect(tiff.fileType).toEqual('image')
  })
  test('pdf', () => {
    defaultData.id = 'bob.pdf'
    const pdf = fileMetadata(defaultData)
    expect(pdf.name).toEqual('billy-bob')
    expect(pdf.fileType).toEqual('pdf')
  })
  test('mov', () => {
    defaultData.id = 'bob.mov'
    const mov = fileMetadata(defaultData)
    expect(mov.name).toEqual('billy-bob')
    expect(mov.fileType).toEqual('video')
  })
  test('m4a', () => {
    defaultData.id = 'bob.m4a'
    const m4a = fileMetadata(defaultData)
    expect(m4a.name).toEqual('billy-bob')
    expect(m4a.fileType).toEqual('audio')
  })
  test('file extension not in the list', () => {
    defaultData.id = 'bob.noExt'
    const noExt = fileMetadata(defaultData)
    expect(noExt.name).toEqual('billy-bob')
    expect(noExt.fileType).toEqual('unknown')
  })
})
