import React from 'react'
import { shallow } from 'enzyme'
import Markdown from './'
import MarkdownCardGroups from './MarkdownCardGroups'
import Layout from 'components/Layout'

test('Markdown', () => {
  const props = {
    data: {
      site: {
        siteMetadata: {
          title: 'home page',
        },
      },
      markdownRemark: {
        frontmatter: {
          mainCallOut: '',
          cards: {
            groups: [],
          },
        },
        html: 'Some html text we could put on the front page.',
      },
    },
    location: {},

  }
  const wrapper = shallow(<Markdown {...props} />)
  expect(wrapper.find(Layout).exists()).toBeTruthy()
  expect(wrapper.find('.bodyText').html()).toContain('Some html text we could put on the front page.')
  expect(wrapper.find(MarkdownCardGroups).exists()).toBeTruthy()
})
