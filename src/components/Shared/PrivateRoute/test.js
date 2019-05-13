import React from 'react'
import { shallow } from 'enzyme'
import PrivateRoute from './'
import * as State from 'utils/state'
import * as Gatsby from 'gatsby'
import * as auth from 'utils/auth'

beforeEach(() => {
  jest
    .spyOn(State, 'getState')
    .mockImplementation(() => [ { user: 'user'}, jest.fn()])
})

test('it renders the page if we are not testing login', () => {
  const wrapper = shallow(<PrivateRoute location={{}} testLogin={false}>TEXT</PrivateRoute>)

  expect(wrapper.text()).toEqual('TEXT')
})

test('it renders the page if they are logged in and we are testing logins', () => {
  jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => true)

  const wrapper = shallow(<PrivateRoute location={{}} testLogin={true}>TEXT</PrivateRoute>)

  expect(wrapper.text()).toEqual('TEXT')
})

test('it navigates to the login page if they are not logged in and we are testing logins', () => {
  jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => false)

  const wrapper = shallow(<PrivateRoute location={{}} testLogin={true}>TEXT</PrivateRoute>)

  expect(Gatsby.navigate).toHaveBeenCalledWith('/login')
})

test('it does not navigage to the login page if they are already on it even if they are not logged in' , () => {
  jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => false)

  const wrapper = shallow(<PrivateRoute location={{pathname: '/login'}} testLogin={true}>TEXT</PrivateRoute>)

  expect(wrapper.text()).toEqual('TEXT')
})
