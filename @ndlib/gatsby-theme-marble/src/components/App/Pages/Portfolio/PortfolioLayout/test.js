import React from 'react'
import { shallow } from 'enzyme'
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
  test('display', () => {
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    const wrapper = shallow(<PortfolioLayout {...props}><div className='childDiv' /></PortfolioLayout>)
    expect(wrapper.find(Seo).props().title).toEqual('test title')
  })
})
