import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import Seo, {
  getTitle,
  getImage,
  getDescription,
  getAuthor,
} from './'
import SeoContent from 'components/Internal/Seo/SeoContent'
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
          value: ['Fake Author'],
        },
      ],
    },
  }
  test('getTitle', () => {
    const title = 'Title - Mirador Viewer'
    let actual = getTitle(title, data, siteMetadata)
    expect(actual).toEqual('Title - Mirador Viewer')
    actual = getTitle('', data, siteMetadata)
    expect(actual).toEqual('Title - Marble item')
    actual = getTitle('', '', siteMetadata)
    expect(actual).toEqual('Default Title')
    actual = getTitle(title, data, siteMetadata)
    expect(actual).toEqual('Title - Mirador Viewer')
  })

  test('getImage', () => {
    const defaultImage = {
      publicURL: 'defaultImage.jpg',
    }
    let actual = getImage(data, defaultImage)
    expect(actual).toEqual('http://thumbnail.jpg')
    actual = getImage('', defaultImage)
    expect(actual).toEqual('defaultImage.jpg')
  })

  test('getDescription', () => {
    let actual = getDescription(null, null, siteMetadata)
    expect(actual).toEqual('Default Description')
    actual = getDescription('description', null, siteMetadata)
    expect(actual).toEqual('description')
    actual = getDescription('', data, siteMetadata)
    expect(actual).toEqual('Item description')
    delete data.marbleItem.description
    actual = getDescription(null, data, siteMetadata)
    expect(actual).toEqual('meta description')
  })

  test('getAuthor', () => {
    let actual = getAuthor(null, null, siteMetadata)
    expect(actual).toEqual('Default Author')
    actual = getAuthor('Fake Author', data, siteMetadata)
    expect(actual).toEqual('Fake Author')
    actual = getAuthor(null, data, siteMetadata)
    expect(actual).toEqual('Fake Author')
    actual = getAuthor(null, null, null)
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
