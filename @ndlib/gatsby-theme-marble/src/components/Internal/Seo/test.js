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
    description: 'Default Description',
    siteTitle: 'Site Title',
    siteUrl: 'http://site.url',
  }
  test('getTitle', () => {
    const itemTitle = 'Title - Mirador Viewer'
    const itemAuthor = 'author'

    let actual = getTitle(itemTitle, siteMetadata)
    expect(actual).toEqual('Title - Mirador Viewer')
    actual = getTitle('Title - Digital Collections', siteMetadata)
    expect(actual).toEqual('Title - Digital Collections')
    actual = getTitle('', siteMetadata)
    expect(actual).toEqual('Default Title')
    actual = getTitle(null, siteMetadata)
    expect(actual).toEqual('Default Title')
  })

  test('getImage', () => {
    const itemImage = 'http://image.jpg'
    const defaultImage = {
      publicURL: 'defaultImage.jpg',
    }
    let actual = getImage(itemImage, defaultImage)
    expect(actual).toEqual('http://image.jpg')
    actual = getImage(defaultImage)
    expect(actual).toEqual('defaultImage.jpg')
  })

  test('getDescription', () => {
    const itemDescription = 'description'
    const description = 'Direct Description'
    const siteMetadata = {
      description: 'Site Description',
    }

    let actual = getDescription(description, itemDescription, siteMetadata)
    expect(actual).toEqual('Direct Description')
    actual = getDescription(itemDescription, siteMetadata)
    expect(actual).toEqual('description')
    actual = getDescription(null, null, siteMetadata)
    expect(actual).toEqual('Site Description')
    actual = getDescription(itemDescription, siteMetadata)
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
    actual = getAuthor(null, null)
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
