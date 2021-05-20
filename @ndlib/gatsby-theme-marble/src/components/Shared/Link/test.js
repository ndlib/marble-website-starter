import React from 'react'
import { shallow } from 'enzyme'
import { Link as ThemeLink } from 'theme-ui'
import Link from './'

describe('Link', () => {
  test('internal Link', () => {
    const wrapper = shallow(<Link to='/some-path'>Link Text</Link>)
    expect(wrapper.find('EmotionCssPropInternal').props().to).toEqual('/some-path')
    expect(wrapper.find('EmotionCssPropInternal').props().children).toEqual('Link Text')
  })
  test('internal Link from slug', () => {
    const wrapper = shallow(<Link to='some-path'>Link Text</Link>)
    expect(wrapper.find('EmotionCssPropInternal').props().to).toEqual('/some-path')
    expect(wrapper.find('EmotionCssPropInternal').props().children).toEqual('Link Text')
  })

  test('external Link', () => {
    const wrapper = shallow(<Link to='http://example.com'>Link Text</Link>)
    expect(wrapper.find(ThemeLink).props().href).toEqual('http://example.com')
    expect(wrapper.find(ThemeLink).text()).toEqual('Link Text')
  })
})
