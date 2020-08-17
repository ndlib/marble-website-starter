import React from 'react'
import { mount } from 'enzyme'
import ExternalLinkIcon from './'

describe('ExternalLinkIcon', () => {
  test('internal link - no icon', () => {
    const wrapper = mount(<ExternalLinkIcon target='/a-page' />)
    expect(wrapper.find('img').exists()).toBeFalsy()
  })
  test('external link - show icon', () => {
    const wrapper = mount(<ExternalLinkIcon target='http://example.com' />)
    expect(wrapper.find('img').exists()).toBeTruthy()
  })
})
