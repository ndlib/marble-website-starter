import React from 'react'
import { shallow } from 'enzyme'
import { LoginArea } from './'
import LogOut from './LogOut'
import OktaLogin from './OktaLogin'
import * as auth from 'utils/auth'
describe('LoginArea', () => {
  test('it renders the log out button when the user is logged in', () => {
    jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => true)
    const loginReducer = {
      user: {
        name: 'userName',
      },
    }
    const wrapper = shallow(<LoginArea loginReducer={loginReducer} />)

    expect(wrapper.find('form').exists()).toBeTruthy()
    expect(wrapper.find(LogOut).exists()).toBeTruthy()
  })

  test('it renders the login form when the user is not logged in', () => {
    jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => false)
    const loginReducer = {
      user: null,
    }
    const wrapper = shallow(<LoginArea loginReducer={loginReducer} />)

    expect(wrapper.find('form').exists()).toBeTruthy()
    expect(wrapper.find(OktaLogin).exists()).toBeTruthy()
  })
})
