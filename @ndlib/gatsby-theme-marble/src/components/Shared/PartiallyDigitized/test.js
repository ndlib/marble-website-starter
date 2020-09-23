import React from 'react'
import { mount } from 'enzyme'
import PartiallyDigitized from './'

describe('PartiallyDigitized', () => {
  test('is partially digitized', () => {
    const wrapper = mount(<PartiallyDigitized marbleItem={{ partiallyDigitized: true }} />)
    expect(wrapper.find('div').exists()).toBeTruthy()
  })
  test('is completely digitized', () => {
    const wrapper = mount(<PartiallyDigitized marbleItem={{}} />)
    expect(wrapper.find('div').exists()).toBeFalsy()
  })
})
