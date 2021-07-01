import React from 'react'
import { shallow } from 'enzyme'
import MetaDataSearchValue from './'

describe('MetaDataValue', () => {
  test('values', () => {
    const values = ['value 1', 'value 2']
    const wrapper = shallow(<MetaDataSearchValue values={values} />)
    expect(wrapper.find('Link').length).toEqual(2)
  })
  test('empty array', () => {
    const values = []
    const wrapper = shallow(<MetaDataSearchValue values={values} />)
    expect(wrapper.find('dd').exists()).toBeFalsy()
  })
  test('null', () => {
    const values = null
    const wrapper = shallow(<MetaDataSearchValue values={values} />)
    expect(wrapper.find('dd').exists()).toBeFalsy()
  })
  test('null values in array', () => {
    const values = [null]
    const wrapper = shallow(<MetaDataSearchValue values={values} />)
    expect(wrapper.find('dd').exists()).toBeFalsy()
  })
  test('expands --', () => {
    const values = ['value 1 -- value 2']
    const wrapper = shallow(<MetaDataSearchValue values={values} urlField='search' />)
    expect(wrapper.find('Link').length).toEqual(2)
    const test = '<dd><span><a class="css-1qrb33i-Link" href="/search?search[0]=value 1">value 1</a> -- </span><span><a class="css-1qrb33i-Link" href="/search?search[0]=value 2">value 2</a></span></dd>'
    expect(wrapper.html()).toEqual(test)
  })
})
