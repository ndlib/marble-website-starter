import React from 'react'
import { shallow } from 'enzyme'
import MetaDataMarkdownValue from './'

describe('MetaDataMarkdownValue', () => {
  test('values', () => {
    const values = ['value 1', 'value 2']
    const wrapper = shallow(<MetaDataMarkdownValue values={values} />)
    expect(wrapper.find('dd').length).toEqual(2)
  })
  test('null', () => {
    const values = []
    const wrapper = shallow(<MetaDataMarkdownValue values={values} />)
    expect(wrapper.find('dd').exists()).toBeFalsy()
  })
})
