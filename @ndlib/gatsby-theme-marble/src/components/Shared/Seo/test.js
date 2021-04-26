import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import * as helper from './helpers'
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
        {
          label: 'Subject',
          value: ['1','2','3','4','5'],
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
      publicURL: 'defaultImage.jpg',
    }
    let actual = helper.getThumbnail(data, defaultImage)
    expect(actual).toEqual('http://thumbnail.jpg')
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

  test('getKeywords', () => {
    let actual = helper.getAuthor(null, null)
    expect(actual).toEqual(null)
    actual = helper.getKeywords(['5','4','3','2','1'], data)
    expect(actual).toEqual(['5','4','3','2','1'])
    actual = helper.getKeywords(null, data)
    expect(actual).toEqual('1,2,3,4,5')
  })

  test('getFieldValue', () => {
    let actual = helper.getFieldValue(null, null, null)
    expect(actual).toEqual(null)
    actual = helper.getFieldValue('classification', 'Book', data)
    expect(actual).toEqual('classification')
    actual = helper.getFieldValue(null, null, null)
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
