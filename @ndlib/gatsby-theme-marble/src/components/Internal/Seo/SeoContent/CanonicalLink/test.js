import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
import CanonicalLink from './'

describe('CanonicalLink', () => {
  test('null pathname', () => {
    const wrapper = shallow(<CanonicalLink base={'http://example'} />)
    expect(wrapper.find('link').at(1).exists()).toBeFalsy()
  })

  test('valid pathname', () => {
    const wrapper = shallow(<CanonicalLink base={'http://example'} pathname={'/test/path'} />)
    expect(wrapper.find(Helmet).exists()).toBeTruthy()
    expect(wrapper.find('link').at(1).props().rel).toEqual('canonical')
    expect(wrapper.find('link').at(1).props().href).toEqual('http://example/test/path')
  })
})
