import React from 'react'
import { mount } from 'enzyme'
import BrowseBar from './'
import Link from 'components/Internal/Link'
import Image from 'components/Shared/Image'

describe('BrowseBar', () => {
  console.error = jest.fn()

  test('mounts properly', () => {
    const wrapper = mount(<BrowseBar label='label' target='/some/path' image='/image/path' />)
    expect(wrapper.find(Link).props().to).toEqual('/some/path')
    expect(wrapper.find(Image).exists()).toBeTruthy()
  })
})
