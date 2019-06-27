import React from 'react'
import { shallow } from 'enzyme'
import { SiteLogo } from './'
import Link from 'components/Shared/Link'

test('SiteLogo', () => {
  const data = {
    site: {
      siteMetadata: {
        title: 'My Title',
      },
    },
    file: {
      publicURL: '/image.png',
    },
  }
  const wrapper = shallow(<SiteLogo data={data} />)
  expect(wrapper.find(Link).props().to).toEqual('/')
  expect(wrapper.find(Link).props().className).toEqual('siteTitle')
  expect(wrapper.find('img.siteLogo').props().alt).toEqual('My Title')
  expect(wrapper.find('img.siteLogo').props().title).toEqual('My Title')
  expect(wrapper.find('img.siteLogo').props().src).toEqual('/image.png')
})
