import React from 'react'
import { shallow } from 'enzyme'
import Login from '../login'
import * as State from 'utils/state'

beforeEach(() => {
  jest
    .spyOn(State, 'getState')
    .mockImplementation(() => [ { user: 'user'}, jest.fn()])
})

test('it renders the login page', () => {
  const wrapper = shallow(<Login />)

  expect(wrapper.find('Layout').exists()).toBeTruthy()
  expect(wrapper.find('h1').text()).toEqual('Login')
  expect(wrapper.find('form').exists()).toBeTruthy()

  expect(wrapper.find('button').length).toEqual(2)
  expect(wrapper.find('button#google').text()).toEqual('Login with Google')
  expect(wrapper.find('button#facebook').text()).toEqual('Login with Facebook')
  expect(wrapper.find('input[type="submit"]').prop('value')).toEqual('Login with Notre Dame Campus Authentication')
})
