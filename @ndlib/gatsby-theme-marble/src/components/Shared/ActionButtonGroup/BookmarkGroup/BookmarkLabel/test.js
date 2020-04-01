import React from 'react'
import { mount } from 'enzyme'
import BookmarkLabel from './'

test('BookmarkLabel', () => {
  const wrapper = mount(<BookmarkLabel />)
  expect(wrapper.find('img').exists()).toBeTruthy()
  expect(wrapper.find('span').text()).toEqual('Save to a portfolio')
})
