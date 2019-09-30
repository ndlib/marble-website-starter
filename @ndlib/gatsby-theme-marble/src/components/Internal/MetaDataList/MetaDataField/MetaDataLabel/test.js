import React from 'react'
import { shallow } from 'enzyme'
import MetaDataLabel from './'

describe('MetaDataLabel', () => {
  test('labels', () => {
    const labels = ['label 1', 'label 2']
    const wrapper = shallow(<MetaDataLabel labels={labels} />)
    expect(wrapper.find('dt').length).toEqual(2)
  })
  test('null', () => {
    const labels = []
    const wrapper = shallow(<MetaDataLabel labels={labels} />)
    expect(wrapper.find('dt').exists()).toBeFalsy()
  })
})
