import React from 'react'
import { shallow } from 'enzyme'
import ExteralLinkIcon from './'

describe('ExteralLinkIcon', () => {
  test('internal link - no icon', () => {
    const wrapper = shallow(<ExteralLinkIcon target='/a-page' />)
    expect(wrapper.find('.iconWrapper').exists()).toBeFalsy()
  })
  test('external link - show icon', () => {
    const wrapper = shallow(<ExteralLinkIcon target='http://example.com' />)
    expect(wrapper.find('.iconWrapper').exists()).toBeTruthy()
  })
})
