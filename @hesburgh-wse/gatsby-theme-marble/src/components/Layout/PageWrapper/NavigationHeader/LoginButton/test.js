import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import { LoginButton, getSafeName } from './'
import Link from 'components/Internal/Link'
import userIcon from 'assets/icons/svg/baseline-person-24px-white.svg'

describe('LoginButton', () => {
  test('no button', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return {
        site: {
          siteMetadata: {},
        },
      }
    })
    const loginReducer = { status: 'STATUS NOT LOGGED IN' }
    const wrapper = shallow(<LoginButton loginReducer={loginReducer} />)
    expect(wrapper.find('.loginButton').exists()).toBeFalsy()
  })

  test('logged in', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return {
        site: {
          siteMetadata: {
            useLogin: true,
          },
        },
      }
    })
    const loginReducer = {
      status: 'STATUS_LOGGED_IN',
      user: {
        fullname: 'Johnny Logged In',
        username: 'jloggedin',
      },
    }
    const wrapper = shallow(<LoginButton loginReducer={loginReducer} />)
    expect(wrapper.find('.loginButton').exists()).toBeTruthy()
    expect(wrapper.find(Link).props().to).toEqual('/user/jloggedin')
    expect(wrapper.find('span').text()).toEqual('Johnny Logged In')
    expect(wrapper.find('img').props().src).toEqual(userIcon)
  })

  test('not logged in', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return {
        site: {
          siteMetadata: {
            useLogin: true,
          },
        },
      }
    })
    const loginReducer = { status: 'STATUS NOT LOGGED IN' }
    const wrapper = shallow(<LoginButton loginReducer={loginReducer} />)
    expect(wrapper.find('.loginButton').exists()).toBeTruthy()
    expect(wrapper.find(Link).props().to).toEqual('/user')
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
