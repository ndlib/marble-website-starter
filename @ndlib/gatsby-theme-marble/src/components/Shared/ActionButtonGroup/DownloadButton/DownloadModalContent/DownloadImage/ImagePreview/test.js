import React from 'react'
import { mount } from 'enzyme'
import ImagePreview from './'

test('ImagePreview', () => {
  const props = {
    sxStyle: {},
    images: ['test/full/full/image.png'],
    selected: 0,
  }
  const wrapper = mount(<ImagePreview {...props} />)
  expect(wrapper.find('picture').exists()).toBeTruthy()
  expect(wrapper.find('img').props().src).toEqual('test/full/,600/image.png')
})
