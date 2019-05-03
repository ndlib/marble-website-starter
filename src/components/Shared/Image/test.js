import React from 'react'
import { shallow } from 'enzyme'
import Image from './'
import noImage from 'assets/images/noImage.svg'

describe('Image', () => {
  test('src', () => {
    const wrapper = shallow(<Image src='myImage.png' alt='alt Txt' />)
    expect(wrapper.find('picture').exists()).toBeTruthy()
    expect(wrapper.find('img').props().alt).toEqual('alt Txt')
    expect(wrapper.find('img').props().src).toEqual('myImage.png')
  })

  test('service', () => {
    const wrapper = shallow(<Image service='service' alt='alt Txt' />)
    expect(wrapper.find('picture').exists()).toBeTruthy()
    expect(wrapper.find('img').props().alt).toEqual('alt Txt')
    expect(wrapper.find('img').props().src).toEqual('service/full/500,/0/default.jpg')
  })

  test('null', () => {
    const wrapper = shallow(<Image alt='alt Txt' />)
    expect(wrapper.find('picture').exists()).toBeTruthy()
    expect(wrapper.find('img').props().alt).toEqual('alt Txt')
    expect(wrapper.find('img').props().src).toEqual(noImage)
  })
})
