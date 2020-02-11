import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import UserBasePath from './'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import LoginArea from 'components/Shared/LoginArea'
import CreateAccount from 'components/Internal/CreateAccount'
import Loading from 'components/Internal/Loading'

describe('UserBasePath', () => {
  test('STATUS_NOT_LOGGED_IN', () => {
    const props = {
      location: {},
      loginReducer: {
        status: 'STATUS_NOT_LOGGED_IN',
      },
    }
    const wrapper = shallow(<UserBasePath {...props} />)
    expect(wrapper.find(LoginArea).exists()).toBeTruthy()
  })

  test('STATUS_TRYING_AUTHENTICATION', () => {
    const props = {
      location: {},
      loginReducer: {
        status: 'STATUS_TRYING_AUTHENTICATION',
      },
    }
    const wrapper = shallow(<UserBasePath {...props} />)
    expect(wrapper.find(Loading).exists()).toBeTruthy()
  })

  test('STATUS_AUTHENTICATION_FAILED', () => {
    const props = {
      location: {},
      loginReducer: {
        status: 'STATUS_AUTHENTICATION_FAILED',
      },
    }
    const wrapper = shallow(<UserBasePath {...props} />)
    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  test('STATUS_AUTHENTICATED_TRYING_LOGIN', () => {
    const props = {
      location: {},
      loginReducer: {
        status: 'STATUS_AUTHENTICATED_TRYING_LOGIN',
      },
    }
    const wrapper = shallow(<UserBasePath {...props} />)
    expect(wrapper.find(Loading).exists()).toBeTruthy()
  })

  test('STATUS_AUTHENTICATED_NOT_LOGGED_IN', () => {
    const props = {
      location: {},
      loginReducer: {
        status: 'STATUS_AUTHENTICATED_NOT_LOGGED_IN',
      },
    }
    const wrapper = shallow(<UserBasePath {...props} />)
    expect(wrapper.find(CreateAccount).exists()).toBeTruthy()
  })

  test('STATUS_LOGGED_IN', () => {
    // expect navigate to be called
    const props = {
      location: {},
      loginReducer: {
        status: 'STATUS_LOGGED_IN',
        user: {
          userName: 'corporal_user',
        },
      },
    }
    shallow(<UserBasePath {...props} />)
    expect(navigate).toHaveBeenCalledWith('/user/corporal_user')
  })

  test('DEFAULT', () => {
    const props = {
      location: {},
      loginReducer: {
        status: '????',
      },
    }
    const wrapper = shallow(<UserBasePath {...props} />)
    expect(wrapper.find('.error').exists()).toBeTruthy()
    expect(wrapper.find(Seo).exists()).toBeTruthy()
    expect(wrapper.find(Layout).exists()).toBeTruthy()
  })
})
