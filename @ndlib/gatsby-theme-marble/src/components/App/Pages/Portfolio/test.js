import React from 'react'
import { shallow } from 'enzyme'
import * as TestedFile from './'
import PortfolioLayout from './PortfolioLayout'
import PortfolioView from './PortfolioView'
import PortfolioEdit from './PortfolioEdit'
import PortfolioUnavailable from './PortfolioUnavailable'
import * as Auth from 'utils/auth'

const { Portfolio } = TestedFile
describe('Portfolio', () => {
  const props = {
    portfolioId: '1',
    edit: null,
    location: {},
    loginReducer: {},
  }
  test('unavailable', () => {
    const wrapper = shallow(<Portfolio {...props} />)
    expect(wrapper.find(PortfolioUnavailable).exists()).toBeTruthy()
  })
  test.skip('regular view', () => {
    jest.spyOn(Utils, 'getPortfolio').mockImplementationOnce(() => {
      return {}
    })
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    jest.spyOn(TestedFile, 'shouldShow').mockImplementationOnce(() => true)

    const wrapper = shallow(<Portfolio {...props} />)
    expect(wrapper.find(PortfolioLayout).exists()).toBeTruthy()
    expect(wrapper.find(PortfolioView).exists()).toBeTruthy()
  })
  test.skip('edit view', () => {
    props.edit = true
    jest.spyOn(Utils, 'getPortfolio').mockImplementationOnce(() => {
      return {}
    })
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    jest.spyOn(TestedFile, 'shouldShow').mockImplementationOnce(() => true)

    const wrapper = shallow(<Portfolio {...props} />)
    expect(wrapper.find(PortfolioLayout).exists()).toBeTruthy()
    expect(wrapper.find(PortfolioEdit).exists()).toBeTruthy()
  })
})
