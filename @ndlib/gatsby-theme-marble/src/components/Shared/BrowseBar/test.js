import React from 'react'
import { mount } from 'enzyme'
import BrowseBar from './'
import Link from 'components/Shared/Link'

describe('BrowseBar', () => {
  console.error = jest.fn()

  test('mounts properly', () => {
    const wrapper = mount(<BrowseBar label='label' target='/some/path' image='put-in-image-div' />)
    expect(wrapper.find(Link).props().to).toEqual('/some/path')
    expect(wrapper.find('div.css-sx6q4r-BrowseBar').exists()).toBeTruthy()
    expect(wrapper.find('div.css-sx6q4r-BrowseBar').text()).toEqual('put-in-image-div')
  })
})
