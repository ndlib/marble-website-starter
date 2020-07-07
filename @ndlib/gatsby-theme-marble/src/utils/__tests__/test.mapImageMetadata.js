import imageMetadata from '../mapStandardJson/imageMetadata'

let defaultData = []

describe('mapImageMetadata', () => {
  beforeEach(() => {
    defaultData = {
      sourceSystem: 'archivesspace',
      title: 'title',
      level: 'collection',
      items: [
        {
          title: 'title',
          level: 'manifest',
          items: [
            {
              level: 'file',
              iiifImageUri: 'https://image.server.com/iiif/file',
            },
          ],
        },
        {
          sourceSystem: 'archivesspace',
          title: 'title2',
          level: 'manifest',
          items: [
            {
              level: 'file',
              iiifImageUri: 'https://image.server.com/iiif/file2',
            },
          ],
        },
      ],
    }
  })

  test('it creates images data out of the file node', () => {
    const test = [
      {
        default: 'https://image.server.com/iiif/file/full/full/0/default.jpg',
        service: 'https://image.server.com/iiif/file',
        thumbnail: 'https://image.server.com/iiif/file/full/400,/0/default.jpg',
        itemId: '',
        coverImage: '',
        order: '',
        label: '',
        type: '',
      },
    ]

    const result = imageMetadata(defaultData.items[0])
    expect(result).toEqual(test)
  })

  it('merges all the images from children into a parent', () => {
    const test = [
      {
        default: 'https://image.server.com/iiif/file/full/full/0/default.jpg',
        service: 'https://image.server.com/iiif/file',
        thumbnail: 'https://image.server.com/iiif/file/full/400,/0/default.jpg',
        itemId: '',
        coverImage: '',
        order: '',
        label: '',
        type: '',
      },
      {
        default: 'https://image.server.com/iiif/file2/full/full/0/default.jpg',
        service: 'https://image.server.com/iiif/file2',
        thumbnail: 'https://image.server.com/iiif/file2/full/400,/0/default.jpg',
        itemId: '',
        coverImage: '',
        order: '',
        label: '',
        type: '',
      },
    ]

    const result = imageMetadata(defaultData)
    expect(result).toEqual(test)
  })
})
