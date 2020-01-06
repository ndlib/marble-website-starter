import React from 'react'
import { mount } from 'enzyme'
import PartiallyDigitized from './'

describe('PartiallyDigitized', () => {
  test('is partially digitized', () => {
    const wrapper = mount(<PartiallyDigitized iiifManifest={{ partiallyDigitized: 'http://partially.digitized.url' }} />)
    expect(wrapper.find('div').exists()).toBeTruthy()
  })
  test('is completely digitized', () => {
    const wrapper = mount(<PartiallyDigitized iiifManifest={{}} />)
    expect(wrapper.find('div').exists()).toBeFalsy()
  })
})
