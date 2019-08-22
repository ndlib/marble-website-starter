import React from 'react'
import { shallow } from 'enzyme'
import ContentWrapper from './'

describe('ContentWrapper', () => {
  test('true', () => {
    const wrapper = shallow(<ContentWrapper noPadding><div className='child' /></ContentWrapper>)
    expect(wrapper.find('.noMainPadding').exists()).toBeTruthy()
    expect(wrapper.find('.mainPadding').exists()).toBeFalsy()
    expect(wrapper.find('.child').exists()).toBeTruthy()
  })
  test('false', () => {
    const wrapper = shallow(<ContentWrapper ><div className='child' /></ContentWrapper>)
    expect(wrapper.find('.noMainPadding').exists()).toBeFalsy()
    expect(wrapper.find('.mainPadding').exists()).toBeTruthy()
    expect(wrapper.find('.child').exists()).toBeTruthy()
  })
})
