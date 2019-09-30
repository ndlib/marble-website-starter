import React from 'react'
import { shallow } from 'enzyme'
import MetaDataValue from './'

describe('MetaDataValue', () => {
  test('values', () => {
    const values = ['value 1', 'value 2']
    const wrapper = shallow(<MetaDataValue values={values} />)
    expect(wrapper.find('dd').length).toEqual(2)
  })
  test('null', () => {
    const values = []
    const wrapper = shallow(<MetaDataValue values={values} />)
    expect(wrapper.find('dd').exists()).toBeFalsy()
  })
})
