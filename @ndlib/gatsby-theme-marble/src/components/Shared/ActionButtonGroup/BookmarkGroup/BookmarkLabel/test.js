import React from 'react'
import { mount } from 'enzyme'
import BookmarkLabel from './'

test('BookmarkLabel', () => {
  const wrapper = mount(<BookmarkLabel text='push me' />)
  expect(wrapper.find('img').exists()).toBeTruthy()
  expect(wrapper.find('span').text()).toEqual('push me')
})
