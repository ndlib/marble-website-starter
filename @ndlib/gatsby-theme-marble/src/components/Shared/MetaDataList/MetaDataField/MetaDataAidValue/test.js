import React from 'react'
import { shallow } from 'enzyme'
import MetaDataAidValue from './'

describe('MetaDataAidValue', () => {
  test('values', () => {
    const values = ['value 1', 'value 2']
    const wrapper = shallow(<MetaDataAidValue values={values} />)
    expect(wrapper.find('dd').length).toEqual(4)
  })
  test('null', () => {
    const values = []
    const wrapper = shallow(<MetaDataAidValue values={values} />)
    expect(wrapper.find('dd').exists()).toBeFalsy()
  })
})
