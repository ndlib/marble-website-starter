import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import PortfolioLayout from './'
import Seo from 'components/Internal/Seo'
import * as Auth from 'utils/auth'

describe('PortfolioLayout', () => {
  const props = {
    portfolio: {
      user: {
        userName: 'fake_user',
      },
      id: '1',
      title: 'test title',
    },
    edit: true,
    location: {},
    loginReducer: {},
  }
  test('redirect', () => {
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => false)
    shallow(<PortfolioLayout {...props}><div className='childDiv' /></PortfolioLayout>)
    expect(navigate).toHaveBeenCalledWith('/myportfolio/1')
  })
  test('display', () => {
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    const wrapper = shallow(<PortfolioLayout {...props}><div className='childDiv' /></PortfolioLayout>)
    expect(wrapper.find(Seo).props().title).toEqual('test title')
  })
})
