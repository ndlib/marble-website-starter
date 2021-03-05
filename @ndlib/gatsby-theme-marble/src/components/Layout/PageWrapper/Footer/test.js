import React from 'react'
import { shallow } from 'enzyme'
import Footer from './'
import Menu from 'components/Shared/Menu'

test('Footer renders some divs with markdown text', () => {
  const wrapper = shallow(<Footer />)

  // expect(wrapper.find('footer').exists()).toBeTruthy()
  expect(wrapper.find(Menu).props().variant).toEqual('footer')
})
