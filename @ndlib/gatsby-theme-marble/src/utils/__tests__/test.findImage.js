import findImage, { findAltImage } from '../findImage'
import noImage from 'assets/images/noImage.svg'
import pdfImage from 'assets/images/pdf.svg'

describe('findImage', () => {
  test('local', () => {
    const item = {
      nodes: [
        {
          local: {
            publicURL: 'local.image',
          },
          fileType: 'image',
        },
      ],
    }

    const result = findImage(item)
    expect(result).toEqual('local.image')
  })

  test('remote', () => {
    const item = {
      nodes: [
        {
          iiif: {
            default: 'https://remote',
          },
          fileType: 'image',
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

  test('pdfImage', () => {
    const item = {}
    const allFile = {
      nodes: [
        { fileType: 'pdf' },
      ],
    }
    const result = findImage(item, allFile)
    expect(result).toEqual(pdfImage)
  })
})

describe('findAltImage', () => {
  test('local', () => {
    const item = {
      nodes: [
        {
          local: {
            childImageSharp: {
              fixed: {
                src: 'local.image',
              },
            },
          },
          fileType: 'image',
        },
      ],
    }
    const result = findAltImage(item, 0)
    expect(result).toEqual('local.image')
  })

  test('remote', () => {
    const item = {
      nodes: [
        {
          iiif: {
            service: 'https://remote',
          },
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
