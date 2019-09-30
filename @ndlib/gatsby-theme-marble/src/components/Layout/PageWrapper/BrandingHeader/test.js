import React from 'react'
import { shallow } from 'enzyme'
import BrandingHeader from './'

describe('BrandingHeader', () => {
  test('default', () => {
    const wrapper = shallow(<BrandingHeader />)
    expect(wrapper.find('.wrapper').exists()).toBeFalsy()
  })
})
