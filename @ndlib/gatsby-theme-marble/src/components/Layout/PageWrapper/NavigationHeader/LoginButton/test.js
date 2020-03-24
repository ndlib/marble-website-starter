import React from 'react'
import { mount } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import { LoginButton, getSafeName } from './'
import Link from 'components/Internal/Link'
import userIcon from 'assets/icons/svg/baseline-person-24px-white.svg'

console.error = jest.fn()

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
    const wrapper = mount(<LoginButton loginReducer={loginReducer} />)
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
        userName: 'jloggedin',
      },
    }
    const wrapper = mount(<LoginButton loginReducer={loginReducer} />)
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
    const wrapper = mount(<LoginButton loginReducer={loginReducer} />)
    expect(wrapper.find(Link).props().to).toEqual('/user')
    expect(wrapper.find(Link).props().children).toEqual('Log in')
  })
})

describe('getSafeName', () => {
  test('fullname', () => {
    const reducer = {
      user: {
        fullname: 'Ms. Fancy User',
        userName: 'fancyUser',
        email: 'fancy@pants.com',
      },
    }
    const safeName = getSafeName(reducer)
    expect(safeName).toEqual('Ms. Fancy User')
  })

  test('userName', () => {
    const reducer = {
      user: {
        userName: 'fancyUser',
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
