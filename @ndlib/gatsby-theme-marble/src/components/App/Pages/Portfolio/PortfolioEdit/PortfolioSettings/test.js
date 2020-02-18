import React from 'react'
import { shallow } from 'enzyme'
import PortfolioSettings from './'

test('PortfolioSettings', () => {
  const props = {
    portfolio: {
      title: 'title',
      description: 'description',
    },
    className: 'myClass',
  }
  const wrapper = shallow(<PortfolioSettings {...props} />)
  expect(wrapper.find('.myClass').exists()).toBeTruthy()
})
