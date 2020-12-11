import React from 'react'
import { shallow } from 'enzyme'
import Footer from './'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'

test('Footer', () => {
  const wrapper = shallow(<Footer />)
  expect(wrapper.find('.footer-email').at(0).text()).toEqual('sniteart@nd.edu')
  expect(wrapper.find('.footer-email').at(1).text()).toEqual('asklib@nd.edu')
  expect(wrapper.find(Menu).props().menu).toEqual('footer')
})
