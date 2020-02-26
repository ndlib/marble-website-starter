import React from 'react'
import { mount } from 'enzyme'
import { PortfolioEdit } from './'

test('PortfolioEdit', () => {
  const props = {
    portfolio: {
      items: [],
    },
    loginReducer: {},
  }
  const wrapper = mount(<PortfolioEdit {...props} />)
  expect(wrapper.find('.wrapper'))
})
