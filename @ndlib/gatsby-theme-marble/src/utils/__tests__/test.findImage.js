import findImage, { findAltImage } from '../findImage'
import noImage from 'assets/images/noImage.svg'

describe('findImage', () => {
  test('local', () => {
    const item = {
      childrenMarbleIiifImage: [
        {
          local: {
            publicURL: 'local.image',
          },
        },
      ],
    }

    const result = findImage(item)
    expect(result).toEqual('local.image')
  })

  test('remote', () => {
    const item = {
      childrenMarbleIiifImage: [
        {
          default: 'https://remote',
        },
      ],
    }
    const result = findImage(item)
    expect(result).toEqual('https://remote')
  })

  test('noImage', () => {
    const item = {}
    const allFile = {}
    const result = findImage(item, allFile)
    expect(result).toEqual(noImage)
  })
})

describe('findAltImage', () => {
  test('local', () => {
    const item = {
      childrenMarbleIiifImage: [
        {
          local: {
            childImageSharp: {
              fixed: {
                src: 'local.image',
              },
            },
          },
        },
      ],
    }
    const result = findAltImage(item, 0)
    expect(result).toEqual('local.image')
  })

  test('remote', () => {
    const item = {
      childrenMarbleIiifImage: [
        {
          service: 'https://remote',
        },
      ],
    }
    const result = findAltImage(item, 0)
    expect(result).toEqual('https://remote/square/125,/0/default.jpg')
  })

  test('noImage', () => {
    const item = {}
    const result = findAltImage(item, 0)
    expect(result).toEqual(noImage)
  })
})
