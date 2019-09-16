import React from 'react'
import { shallow } from 'enzyme'
import { LoginArea } from './'
import MaterialButton from 'components/Internal/MaterialButton'
import * as auth from 'utils/auth'

test('it renders the login page with the user logged in', () => {
  jest.spyOn(auth, 'isLoggedIn').mockImplementation(() => true)
  const loginReducer = {
    user: {
      fullname: 'username',
    },
  }
  const wrapper = shallow(<LoginArea loginReducer={loginReducer} />)

  expect(wrapper.find('form').exists()).toBeTruthy()
  expect(wrapper.find(MaterialButton).length).toEqual(3)
})
