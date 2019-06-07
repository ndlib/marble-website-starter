import React from 'react'
import { shallow } from 'enzyme'
import { SiteLogo } from './'
import Link from 'components/Shared/Link'
const siteLogo = require('assets/logos/default.siteLogo.png')

test('SiteLogo', () => {
  const data = {
    site: {
      siteMetadata: {
        title: 'My Title',
      },
    },
  }
  const wrapper = shallow(<SiteLogo data={data} />)
  expect(wrapper.find(Link).props().to).toEqual('/')
  expect(wrapper.find(Link).props().className).toEqual('siteTitle')
  expect(wrapper.find('img.siteLogo').props().alt).toEqual('My Title')
  expect(wrapper.find('img.siteLogo').props().title).toEqual('My Title')
  expect(wrapper.find('img.siteLogo').props().src).toEqual(siteLogo)
})
