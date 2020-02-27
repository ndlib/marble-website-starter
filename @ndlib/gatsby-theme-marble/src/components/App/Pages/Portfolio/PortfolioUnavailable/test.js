import React from 'react'
import { shallow } from 'enzyme'
import PortfolioUnavailable from './'

test('PortfolioUnavailable', () => {
  const props = {
    location: {},
    loginReducer: {},
  }
  const wrapper = shallow(<PortfolioUnavailable {...props} />)
  expect(wrapper.find('div').exists()).toBeTruthy()
})
