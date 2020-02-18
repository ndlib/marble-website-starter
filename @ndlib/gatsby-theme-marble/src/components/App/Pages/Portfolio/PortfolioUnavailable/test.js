import React from 'react'
import { shallow } from 'enzyme'
import PortfolioUnavailable from './'
import Seo from 'components/Internal/Seo'

test('PortfolioUnavailable', () => {
  const props = {
    location: {},
    loginReducer: {},
  }
  const wrapper = shallow(<PortfolioUnavailable {...props} />)
  expect(wrapper.find(Seo).props().title).toEqual(`Portfolio Unavailable`)
})
