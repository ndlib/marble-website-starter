import React from 'react'
import { shallow } from 'enzyme'
import { LoginButton, getSafeName } from './'
import Link from 'components/Shared/Link'
import userIcon from 'assets/icons/svg/baseline-person-24px-white.svg'

describe('LoginButton', () => {
  test('logged in', () => {
    const loginReducer = {
      status: 'STATUS_LOGGED_IN',
      user: {
        fullname: 'Johnny Logged In',
      },
    }
    const wrapper = shallow(<LoginButton loginReducer={loginReducer} />)
    expect(wrapper.find('.loginButton').exists()).toBeTruthy()
    expect(wrapper.find(Link).props().to).toEqual('/login')
    expect(wrapper.find('span').text()).toEqual('Johnny Logged In')
    expect(wrapper.find('img').props().src).toEqual(userIcon)
  })

  test('not logged in', () => {
    const loginReducer = { status: 'STATUS NOT LOGGED IN' }
    const wrapper = shallow(<LoginButton loginReducer={loginReducer} />)
    expect(wrapper.find('.loginButton').exists()).toBeTruthy()
    expect(wrapper.find(Link).props().to).toEqual('/login')
    expect(wrapper.find(Link).props().children).toEqual('Login')
  })
})

describe('getSafeName', () => {
  test('fullname', () => {
    const reducer = {
      user: {
        fullname: 'Ms. Fancy User',
        username: 'fancyUser',
        email: 'fancy@pants.com',
      },
    }
    const safeName = getSafeName(reducer)
    expect(safeName).toEqual('Ms. Fancy User')
  })

  test('username', () => {
    const reducer = {
      user: {
        username: 'fancyUser',
        email: 'fancy@pants.com',
      },
    }
    const safeName = getSafeName(reducer)
    expect(safeName).toEqual('fancyUser')
  })

  test('email', () => {
    const reducer = {
      user: {
        email: 'fancy@pants.com',
      },
    }
    const safeName = getSafeName(reducer)
    expect(safeName).toEqual('fancy@pants.com')
  })

  test('fallback', () => {
    const reducer = {}
    const safeName = getSafeName(reducer)
    expect(safeName).toEqual('My Stuff')
  })
})
