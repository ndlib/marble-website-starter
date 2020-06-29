import React from 'react'
import { mount } from 'enzyme'
import PartiallyDigitized from './'

describe('PartiallyDigitized', () => {
  test.skip('is partially digitized', () => {
    const wrapper = mount(<PartiallyDigitized iiifManifest={{ partiallyDigitized: true }} />)
    expect(wrapper.find('div').exists()).toBeTruthy()
  })
  test.skip('is completely digitized', () => {
    const wrapper = mount(<PartiallyDigitized iiifManifest={{}} />)
    expect(wrapper.find('div').exists()).toBeFalsy()
  })
})
