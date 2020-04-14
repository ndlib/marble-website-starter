import React from 'react'
import { mount } from 'enzyme'
import TypeLabel from './'

describe('TypeLabel', () => {
  test('Collection', () => {
    const wrapper = mount(<TypeLabel iiifManifest={{ type: 'Collection' }} />)
    expect(wrapper.find('div').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
  })
  test('Not Collection', () => {
    const wrapper = mount(<TypeLabel iiifManifest={{ type: 'Item' }} />)
    expect(wrapper.find('div').exists()).toBeFalsy()
    expect(wrapper.find('img').exists()).toBeFalsy()
  })
})
