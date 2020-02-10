import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
import SchemaLink from './'

describe('SLink', () => {
  test('null pathname', () => {
    const wrapper = shallow(<SchemaLink />)
    expect(wrapper.find('link').exists()).toBeFalsy()
  })

  test('valid pathname', () => {
    const wrapper = shallow(<SchemaLink pathname={'http://example/test/path'} />)
    expect(wrapper.find(Helmet).exists()).toBeTruthy()
    expect(wrapper.find('link').props().rel).toEqual('http://schema.org')
    expect(wrapper.find('link').props().href).toEqual('http://example/test/path')
  })
})
