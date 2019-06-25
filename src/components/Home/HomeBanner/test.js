import React from 'react'
import { shallow } from 'enzyme'
import HomeBanner from './'

test('HomeBanner', () => {
  const props = {
    frontmatter: {
      mainCallOut: 'Call out',
      mainCaption: 'Caption',
      mainBanner: {
        publicURL: './image.png',
      },
    },
    location: {},
  }
  const wrapper = shallow(<HomeBanner {...props} />)
  expect(wrapper.find('.banner').exists()).toBeTruthy()
  expect(wrapper.find('img.bannerImage').props().src).toEqual('./image.png')
  expect(wrapper.find('.imageCaption').exists()).toBeTruthy()
  expect(wrapper.find('.captionFrame').exists()).toBeTruthy()
  expect(wrapper.find('h1').html()).toContain('Call out')
  expect(wrapper.find('.imageCitation').exists()).toBeTruthy()
  expect(wrapper.find('.citation').html()).toContain('Caption')
})
