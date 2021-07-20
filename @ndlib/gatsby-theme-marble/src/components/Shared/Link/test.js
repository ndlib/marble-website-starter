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

  test('external mailto', () => {
    const wrapper = shallow(<Link to='mailto:bob@bob.com'>Link Text</Link>)
    expect(wrapper.find(ThemeLink).props().href).toEqual('mailto:bob@bob.com')
    expect(wrapper.find(ThemeLink).text()).toEqual('Link Text')
  })

  test('external tel', () => {
    const wrapper = shallow(<Link to='tel:180080080000'>Link Text</Link>)
    expect(wrapper.find(ThemeLink).props().href).toEqual('tel:180080080000')
    expect(wrapper.find(ThemeLink).text()).toEqual('Link Text')
  })
})
