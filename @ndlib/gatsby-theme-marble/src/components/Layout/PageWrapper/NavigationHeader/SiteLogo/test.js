import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import SiteLogo from './'
import siteLogo from './siteLogo.png'
import Link from 'components/Internal/Link'

test('SiteLogo', () => {
  useStaticQuery.mockImplementationOnce(() => {
    return {
      site: {
        siteMetadata: {
          title: 'My Title',
        },
      },
    }
  })
  const wrapper = shallow(<SiteLogo />)
  expect(wrapper.find(Link).props().to).toEqual('/')
  expect(wrapper.find(Link).props().className).toEqual('siteTitle')
  expect(wrapper.find('img.siteLogo').props().alt).toEqual('My Title')
  expect(wrapper.find('img.siteLogo').props().title).toEqual('My Title')
  expect(wrapper.find('img.siteLogo').props().src).toEqual(siteLogo)
})
