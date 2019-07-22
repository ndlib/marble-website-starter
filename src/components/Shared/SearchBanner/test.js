import React from 'react'
import { shallow } from 'enzyme'
import SearchBanner from './'
describe('SearchBanner', () => {
  test('show banner', () => {
    const props = {
      callOut: 'Call out',
      caption: 'Caption',
      image: './image.png',
      location: {},
    }
    const wrapper = shallow(<SearchBanner {...props} />)
    expect(wrapper.find('.banner').exists()).toBeTruthy()
    expect(wrapper.find('img.bannerImage').props().src).toEqual('./image.png')
    expect(wrapper.find('.imageCaption').exists()).toBeTruthy()
    expect(wrapper.find('.captionFrame').exists()).toBeTruthy()
    expect(wrapper.find('h1').html()).toContain('Call out')
    expect(wrapper.find('.imageCitation').exists()).toBeTruthy()
    expect(wrapper.find('.citation').html()).toContain('Caption')
  })
})
