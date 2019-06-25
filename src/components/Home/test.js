import React from 'react'
import { shallow } from 'enzyme'
import Home from './'
import HomeCardGroups from './HomeCardGroups'
import Layout from 'components/Layout'

test('Home', () => {
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
  const wrapper = shallow(<Home {...props} />)
  expect(wrapper.find(Layout).exists()).toBeTruthy()
  expect(wrapper.find('.homeText').html()).toContain('Some html text we could put on the front page.')
  expect(wrapper.find(HomeCardGroups).exists()).toBeTruthy()
})
