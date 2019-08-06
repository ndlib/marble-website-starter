import React from 'react'
import {
  getTitle,
  getImage,
  getDescription,
  getAuthor,
  getDescriptionFromMetadata,
} from './'

describe('Seo', () => {
  const siteMetadata = {
    languages: {
      default: 'en',
    },
    title: 'Default Title',
    description: 'Default Description',
    siteTitle: 'Site Title',
    siteUrl: 'http://site.url',
  }
  test('getTitle', () => {
    const title = 'Direct Title'
    const frontmatter = {
      title: 'Front Title',
      iiifJson: {
        label: {
          en: ['Manifest Title'],
        },
      },
    }
    let actual = getTitle(title, frontmatter, siteMetadata)
    expect(actual).toEqual('Direct Title')
    actual = getTitle(null, frontmatter, siteMetadata)
    expect(actual).toEqual('Front Title')
    delete frontmatter.title
    actual = getTitle(null, frontmatter, siteMetadata)
    expect(actual).toEqual('Manifest Title')
    actual = getTitle('', {}, siteMetadata)
    expect(actual).toEqual('Default Title')
  })
  test('getImage', () => {
    const frontmatter = {
      iiifJson: {
        thumbnail: [
          { id: 'thumbnail.jpg' },
        ],
      },
    }
    const defaultImage = {
      publicURL: 'defaultImage.jpg',
    }
    let actual = getImage(frontmatter, defaultImage)
    expect(actual).toEqual('thumbnail.jpg')
    actual = getImage({}, defaultImage)
    expect(actual).toEqual('defaultImage.jpg')
  })
  test('getDescription', () => {
    const description = 'Direct Description'
    const frontmatter = {
      iiifJson: {
        summary: 'Manifest Description',
      },
    }
    const siteMetadata = {
      description: 'Site Description',
    }
    const longDescription = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'

    let actual = getDescription(description, frontmatter, siteMetadata)
    expect(actual).toEqual('Direct Description')
    actual = getDescription(null, frontmatter, siteMetadata)
    expect(actual).toEqual('Manifest Description')
    actual = getDescription(null, null, siteMetadata)
    expect(actual).toEqual('Site Description')
    actual = getDescription(longDescription, frontmatter, siteMetadata)
    expect(actual).toEqual('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis…')
  })
  test('getAuthor', () => {
    const siteMetadata = {
      author: 'Bill Nye the Science Guy',
    }
    let actual = getAuthor('Bill Guy the Science Nye', siteMetadata)
    expect(actual).toEqual('Bill Guy the Science Nye')
    actual = getAuthor('', siteMetadata)
    expect(actual).toEqual('Bill Nye the Science Guy')
  })
  test('getDescriptionFromMetadata', () => {
    const siteMetadata = {
      languages: {
        default: 'tlh',
      },
    }
    const frontmatter = {
      iiifJson: {
        metadata: [
          {
            label: {
              tlh: ['Summary'],
            },
            value: {
              tlh: ['You are a disappointment to the empire.'],
            },
          },
        ],
      },
    }

    let actual = getDescriptionFromMetadata(frontmatter, siteMetadata)
    expect(actual).toEqual('You are a disappointment to the empire.')
    actual = getDescriptionFromMetadata({}, siteMetadata)
    expect(actual).toEqual(null)
  })
})
