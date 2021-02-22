import React from 'react'
import { mount } from 'enzyme'
import MetaDataLabel from './'

describe('MetaDataLabel', () => {
  test('labels', () => {
    const labels = ['label 1', 'label 2']
    const wrapper = mount(<MetaDataLabel labels={labels} />)
    expect(wrapper.find('dt').length).toEqual(2)
  })
  test('null', () => {
    const labels = []
    const wrapper = mount(<MetaDataLabel labels={labels} />)
    expect(wrapper.find('dt').exists()).toBeFalsy()
  })
})
