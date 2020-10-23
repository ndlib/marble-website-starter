import React from 'react'
import { mount } from 'enzyme'
import ImagePreview from './'

test('ImagePreview', () => {
  const props = {
    sxStyle: {},
    images: [{ iiif: { service: 'http://image.service' } }],
    selected: 0,
  }
  const wrapper = mount(<ImagePreview {...props} />)
  expect(wrapper.find('picture').exists()).toBeTruthy()
  expect(wrapper.find('img').props().src).toEqual('http://image.service/full/,600/0/default.jpg')
})
