import React from 'react'
import { shallow } from 'enzyme'
import { Link as GatsbyLink } from 'gatsby'
import Link from './'

describe('Link', () => {
  test('internal Link', () => {
    const wrapper = shallow(<Link to='/some-path'>Link Text</Link>)
    expect(wrapper.find(GatsbyLink).props().to).toEqual('/some-path')
    expect(wrapper.find(GatsbyLink).props().children).toEqual('Link Text')
  })
  test('internal Link from sug', () => {
    const wrapper = shallow(<Link to='some-path'>Link Text</Link>)
    expect(wrapper.find(GatsbyLink).props().to).toEqual('/some-path')
    expect(wrapper.find(GatsbyLink).props().children).toEqual('Link Text')
  })

  test('external Link', () => {
    const wrapper = shallow(<Link to='http://example.com'>Link Text</Link>)
    expect(wrapper.find('a').props().href).toEqual('http://example.com')
    expect(wrapper.find('a').text()).toEqual('Link Text')
  })
})
