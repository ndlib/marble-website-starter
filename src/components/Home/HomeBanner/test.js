import React from 'react'
import { shallow } from 'enzyme'
import HomeBanner from './'

test('HomeBanner', () => {
  const wrapper = shallow(<HomeBanner location={{}} />)
  expect(wrapper.find('.banner').exists()).toBeTruthy()
  expect(wrapper.find('img.bannerImage').exists()).toBeTruthy()
  expect(wrapper.find('.imageCaption').exists()).toBeTruthy()
  expect(wrapper.find('.captionFrame').exists()).toBeTruthy()
  expect(wrapper.find('.imageCitation').exists()).toBeTruthy()
  expect(wrapper.find('.citation').exists()).toBeTruthy()
})
