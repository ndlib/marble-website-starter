import findImage, { findAltImage } from '../findImage'
import noImage from 'assets/images/noImage.svg'

describe('findImage', () => {
  test('local', () => {
    const item = {
      childrenMarbleIiifImage: [
        { name: 'image' },
      ],
    }
    const allFile = {
      nodes: [{
        name: 'image',
        publicURL: 'local.image',
      }],
    }
    const result = findImage(item, allFile)
    expect(result).toEqual('local.image')
  })
  test('remote', () => {
    const item = {
      childrenMarbleIiifImage: [
        {
          name: 'image',
          default: 'https://remote',
        },
      ],
    }
    const allFile = { nodes: [] }
    const result = findImage(item, allFile)
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
        { name: 'image' },
      ],
    }
    const allFile = {
      nodes: [{
        name: 'image',
        childImageSharp: {
          fixed: {
            src: 'local.image',
          },
        },
      }],
    }
    const result = findAltImage(item, allFile, 0)
    expect(result).toEqual('local.image')
  })
  test('remote', () => {
    const item = {
      childrenMarbleIiifImage: [
        {
          name: 'image',
          service: 'https://remote',
        },
      ],
    }
    const allFile = { nodes: [] }
    const result = findAltImage(item, allFile, 0)
    expect(result).toEqual('https://remote/square/125,/0/default.jpg')
  })
  test('noImage', () => {
    const item = {}
    const allFile = {}
    const result = findAltImage(item, allFile, 0)
    expect(result).toEqual(noImage)
  })
})
