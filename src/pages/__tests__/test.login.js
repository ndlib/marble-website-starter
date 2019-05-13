import React from 'react'
import { shallow } from 'enzyme'
import { Login } from '../login'
import * as auth from 'utils/auth'

test('it renders the login page with the user logged in', () => {
  jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => true)
  const loginReducer = {
    user: {
      fullname: 'username',
    },
  }
  const wrapper = shallow(<Login loginReducer={loginReducer} />)

  expect(wrapper.find('Layout').exists()).toBeTruthy()
  expect(wrapper.find('Layout').prop('title')).toEqual('Login')
  expect(wrapper.find('form').exists()).toBeTruthy()

  expect(wrapper.find('button').length).toEqual(2)
  expect(wrapper.find('button#google').text()).toEqual('Login with Google')
  expect(wrapper.find('button#facebook').text()).toEqual('Login with Facebook')
  expect(wrapper.find('input[type="submit"]').prop('value')).toEqual('Login with Notre Dame Campus Authentication')
})
