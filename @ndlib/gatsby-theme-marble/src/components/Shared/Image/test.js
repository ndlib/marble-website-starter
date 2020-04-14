import React from 'react'
import { mount } from 'enzyme'
import Image from './'
import noImage from 'assets/images/noImage.svg'

describe('Image', () => {
  test('src', () => {
    const wrapper = mount(<Image src='myImage.png' alt='alt Txt' />)
    expect(wrapper.find('picture').exists()).toBeTruthy()
    expect(wrapper.find('img').props().alt).toEqual('alt Txt')
    expect(wrapper.find('img').props().src).toEqual('myImage.png')
  })

  test('service', () => {
    const wrapper = mount(<Image service='service' alt='alt Txt' />)
    expect(wrapper.find('picture').exists()).toBeTruthy()
    expect(wrapper.find('img').props().alt).toEqual('alt Txt')
    expect(wrapper.find('img').props().src).toEqual('service/full/1000,/0/default.jpg')
  })

  test('null', () => {
    const wrapper = mount(<Image alt='alt Txt' />)
    expect(wrapper.find('picture').exists()).toBeTruthy()
    expect(wrapper.find('img').props().alt).toEqual('alt Txt')
    expect(wrapper.find('img').props().src).toEqual(noImage)
  })
})
