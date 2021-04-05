import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import * as helper from '../../../../static/helpers'
import SeoContent from 'components/Shared/Seo/SeoContent'
import Seo from 'components/Shared/Seo'
describe('Seo', () => {
  const siteMetadata = {
    languages: {
      default: 'en',
    },
    title: 'Default Title',
    author: 'Default Author',
    description: 'Default Description',
    siteTitle: 'Site Title',
    siteUrl: 'http://site.url',
  }
  const data = {
    marbleItem: {
      childrenMarbleFile: {
        0: {
          iiif: {
            default: 'http://image.jpg',
            thumbnail: 'http://thumbnail.jpg',
          },
        },
      },
      title: 'Title - Marble item',
      description: 'Item description',
      metadata: [
        {
          label: 'Summary',
          value: ['meta description'],
        },
        {
          label: 'Creator',
          value: ['George Orwell'],
        },
        {
          label: 'Date',
          value: ['1984'],
        },
        {
          label: 'Dimensions',
          value: ['Fake Dimensions'],
        },
        {
          label: 'Credit Line',
          value: ['BBC'],
        },
        {
          label: 'Classification',
          value: ['Book'],
        },
      ],
    },
  }
  test('getTitle', () => {
    const title = 'Title - Mirador Viewer'
    let actual = helper.getTitle(title, data, siteMetadata)
    expect(actual).toEqual('Title - Mirador Viewer')
    actual = helper.getTitle('', data, siteMetadata)
    expect(actual).toEqual('Title - Marble item')
    actual = helper.getTitle('', '', siteMetadata)
    expect(actual).toEqual('Default Title')
    actual = helper.getTitle(title, data, siteMetadata)
    expect(actual).toEqual('Title - Mirador Viewer')
  })

  test('getImage', () => {
    const defaultImage = {
      publicURL: 'defaultImage.jpg',
    }
    let actual = helper.getImage(data, defaultImage)
    expect(actual).toEqual('http://image.jpg')
    actual = helper.getImage('', defaultImage)
    expect(actual).toEqual('defaultImage.jpg')
  })

  test('getThumbnail', () => {
    const defaultImage = {
      publicURL: 'defaultThumbmail.jpg',
    }
    let actual = helper.getThumbnail(data, defaultImage)
    expect(actual).toEqual('http://thumnail.jpg')
    actual = helper.getThumbnail('', defaultImage)
    expect(actual).toEqual('defaultImage.jpg')
  })

  test('getDescription', () => {
    let actual = helper.getDescription(null, null, siteMetadata)
    expect(actual).toEqual('Default Description')
    actual = helper.getDescription('description', null, siteMetadata)
    expect(actual).toEqual('description')
    actual = helper.getDescription('', data, siteMetadata)
    expect(actual).toEqual('Item description')
    delete data.marbleItem.description
    actual = helper.getDescription(null, data, siteMetadata)
    expect(actual).toEqual('meta description')
  })

  test('getAuthor', () => {
    let actual = helper.getAuthor(null, null, siteMetadata)
    expect(actual).toEqual('Default Author')
    actual = helper.getAuthor('George Orwell', data, siteMetadata)
    expect(actual).toEqual('George Orwell')
    actual = helper.getAuthor(null, data, siteMetadata)
    expect(actual).toEqual('George Orwell')
    actual = helper.getAuthor(null, null, null)
    expect(actual).toEqual(null)
  })

  test('getDate', () => {
    let actual = helper.getDate(null, null)
    expect(actual).toEqual(null)
    actual = helper.getDate('1984', data)
    expect(actual).toEqual('1984')
    actual = helper.getDate(null, data)
    expect(actual).toEqual('1984')
    actual = helper.getDate(null, null)
    expect(actual).toEqual(null)
  })

  test('getDimensions', () => {
    let actual = helper.getDimensions(null, null)
    expect(actual).toEqual(null)
    actual = helper.getDimensions('2 x 4', data)
    expect(actual).toEqual('2 x 4')
    actual = helper.getDimensions(null, data)
    expect(actual).toEqual('Fake Dimensions')
    actual = helper.getDimensions(null, null)
    expect(actual).toEqual(null)
  })

  test('getCreditText', () => {
    let actual = helper.getCreditText(null, null)
    expect(actual).toEqual(null)
    actual = helper.getCreditText('BBC', data)
    expect(actual).toEqual('BBC')
    actual = helper.getCreditText(null, data)
    expect(actual).toEqual('BBC')
    actual = helper.getCreditText(null, null)
    expect(actual).toEqual(null)
  })

  test('getClassification', () => {
    let actual = helper.getClassification(null, null)
    expect(actual).toEqual(null)
    actual = helper.getClassification('Book', data)
    expect(actual).toEqual('Book')
    actual = helper.getClassification(null, data)
    expect(actual).toEqual('Book')
    actual = helper.getClassification(null, null)
    expect(actual).toEqual(null)
  })

  test('rendering', () => {
    const data = {
      remarkMarblePage: {
        frontmatter: {},
      },
    }
    const sq = {
      site: {
        siteMetadata: {
          title: 'title',
          description: 'description',
          author: 'author',
          siteUrl: 'http://example.com',
          languages: {
            default: 'boov',
          },
        },
      },
      file: {
        publicURL: '/my-file.png',
      },
    }
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })

    const wrapper = shallow(<Seo location={{ pathname:'c' }} data={data} />)
    expect(wrapper.find(SeoContent).props().title).toEqual('title')
    expect(wrapper.find(SeoContent).props().author).toEqual('author')
    expect(wrapper.find(SeoContent).props().image).toEqual('/my-file.png')
    expect(wrapper.find(SeoContent).props().description).toEqual('description')
    expect(wrapper.find(SeoContent).props().pathname).toEqual('c')
    expect(wrapper.find(SeoContent).props().siteTitle).toEqual('title')
    expect(wrapper.find(SeoContent).props().siteUrl).toEqual('http://example.com')
    expect(wrapper.find(SeoContent).props().lang).toEqual('boov')
  })
})
