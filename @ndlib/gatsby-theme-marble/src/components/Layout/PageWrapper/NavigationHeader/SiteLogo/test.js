import React from 'react'
import { mount } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import SiteLogo from './'
import siteLogo from './siteLogo.png'
import Link from 'components/Internal/Link'

console.error = jest.fn()
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
  const wrapper = mount(<SiteLogo />)
  expect(wrapper.find(Link).props().to).toEqual('/')
  expect(wrapper.find('img').props().alt).toEqual('My Title')
  expect(wrapper.find('img').props().title).toEqual('My Title')
  expect(wrapper.find('img').props().src).toEqual(siteLogo)
})
