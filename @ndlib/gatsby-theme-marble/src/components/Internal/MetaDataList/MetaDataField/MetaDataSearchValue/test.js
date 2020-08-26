import React from 'react'
import { shallow } from 'enzyme'
import MetaDataSearchValue from './'

describe('MetaDataValue', () => {
  test('values', () => {
    const values = ['value 1', 'value 2']
    const wrapper = shallow(<MetaDataSearchValue values={values} />)
    expect(wrapper.find('Link').length).toEqual(2)
  })
  test('null', () => {
    const values = []
    const wrapper = shallow(<MetaDataSearchValue values={values} />)
    expect(wrapper.find('dd').exists()).toBeFalsy()
  })
})
