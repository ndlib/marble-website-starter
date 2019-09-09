import React from 'react'
import { shallow } from 'enzyme'
import TypeLabel from './'

describe('TypeLabel', () => {
  test('Collection', () => {
    const wrapper = shallow(<TypeLabel iiifManifest={{ type: 'Collection' }} />)
    expect(wrapper.find('.typeLabel').exists()).toBeTruthy()
  })
  test('Not Collection', () => {
    const wrapper = shallow(<TypeLabel iiifManifest={{ type: 'Item' }} />)
    expect(wrapper.find('.typeLabel').exists()).toBeFalsy()
  })
})
