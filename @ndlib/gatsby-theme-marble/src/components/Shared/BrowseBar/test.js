import React from 'react'
import { mount } from 'enzyme'
import BrowseBar from './'
import Link from 'components/Shared/Link'

describe('BrowseBar', () => {
  console.error = jest.fn()

  test('mounts properly', () => {
    const wrapper = mount(<BrowseBar label='label' target='/some/path' image='/image/path' />)
    expect(wrapper.find(Link).props().to).toEqual('/some/path')
    expect(wrapper.find('picture').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
  })
})
