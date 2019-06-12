import React from 'react'
import { StaticQuery } from 'gatsby' // mocked
import { shallow } from 'enzyme'
import { MarkdownTemplate } from '../markdownTemplate'
import SEO from 'components/Shared/Seo'
import Navigation from 'components/Shared/Navigation'

test('it renders the markdown template with a nav', () => {
  const data = {
    markdownRemark: {
      html: `<p>HTML! </p>`,
      frontmatter: {
        title: `Page Title`,
        slug: `urlForEver`,
        menu: `menu`,
      },
    },
  }

  const wrapper = shallow(<MarkdownTemplate data={data} location={{}} />)

  expect(wrapper.find('Layout').prop('title')).toEqual('Page Title')
  expect(wrapper.find('Layout div').prop('dangerouslySetInnerHTML').__html).toEqual('<p>HTML! </p>')
  expect(wrapper.find('Layout').prop('preMain')).toEqual(<SEO lang='en' title='Page Title' />)
  expect(wrapper.find('Layout').prop('nav')).toEqual(<Navigation id='menu' />)
})

test('it renders no nav when there is no menu', () => {
  const data = {
    markdownRemark: {
      html: `<p>HTML! </p>`,
      frontmatter: {
        title: `Page Title`,
        slug: `urlForEver`,
      },
    },
  }
  const wrapper = shallow(<MarkdownTemplate data={data} location={{}} />)

  expect(wrapper.find('Layout').prop('nav')).toEqual(null)
})

test('it renders a map when there is a map', () => {
  const data = {
    markdownRemark: {
      html: `<p>HTML! </p>`,
      frontmatter: {
        title: `Page Title`,
        slug: `urlForEver`,
        map: {
          kmlFile: "file"
        }
      },
    },
  }
  const wrapper = shallow(<MarkdownTemplate data={data} location={{}} />)

  expect(wrapper.find('KmlMap').prop('map')).toEqual({kmlFile: "file" })
})
