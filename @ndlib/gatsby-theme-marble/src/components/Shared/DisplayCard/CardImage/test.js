import React from 'react'
import { mount } from 'enzyme'
import CardImage from './'

describe('Image', () => {
  test('src', () => {
    const wrapper = mount(<CardImage image='http://image-iiif.library.nd.edu/myImage.jpg' alt='alt Txt' />)
    expect(wrapper.find('picture').exists()).toBeTruthy()
    expect(wrapper.find('img').props().alt).toEqual('alt Txt')
    expect(wrapper.find('img').props().src).toContain('myImage.jpg')
    expect(wrapper.find('source').props().srcSet).toContain('myImage.webp')
  })

  test('noImage', () => {
    const wrapper = mount(<CardImage alt='alt Txt' />)
    expect(wrapper.find('picture').exists()).toBeTruthy()
    expect(wrapper.find('img').props().alt).toEqual('alt Txt')
    expect(wrapper.find('img').props().src).toContain('test-file-stub')
    expect(wrapper.find('source').exists()).toBeFalsy()
  })
})
