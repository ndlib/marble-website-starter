import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import LoginOrRedirect from './'
import * as Auth from 'utils/auth'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import LoginArea from 'components/Shared/LoginArea'

describe('LoginOrRedirect', () => {
  test('logged in', () => {
    const props = {
      location: {},
      loginReducer: {
        user: {
          username: 'corporal_user',
        },
      },
      dispatch: jest.fn(),
    }
    jest.spyOn(Auth, 'isLoggedIn').mockImplementationOnce(() => true)
    shallow(<LoginOrRedirect {...props} />)
    expect(navigate).toHaveBeenCalledWith('/user/corporal_user')
  })
  test('not logged in', () => {
    const props = {
      location: {},
      loginReducer: {},
      dispatch: jest.fn(),
    }
    jest.spyOn(Auth, 'isLoggedIn').mockImplementationOnce(() => false)
    const wrapper = shallow(<LoginOrRedirect {...props} />)
    expect(wrapper.find(Layout).exists()).toBeTruthy()
    expect(wrapper.find(Seo).props().title).toEqual('Login')
    expect(wrapper.find(LoginArea).exists()).toBeTruthy()
  })
})
