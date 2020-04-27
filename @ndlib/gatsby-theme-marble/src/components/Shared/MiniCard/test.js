import React from 'react'
import { mount } from 'enzyme'
import MiniCard from './'

test('MiniCard', () => {
  console.error = jest.fn()

  const wrapper = mount(<MiniCard label='Mini Me' target='complete/me' />)
  expect(wrapper.find('h3').text()).toEqual('Mini Me')
  expect(wrapper.find('a').props().href).toEqual('complete/me')
})
