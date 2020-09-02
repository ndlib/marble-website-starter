import React from 'react'
import { mount } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import { LoginButton } from './'
import Link from 'components/Internal/Link'
import userIcon from 'assets/icons/svg/baseline-person-24px-white.svg'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

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
    const wrapper = mount(<LoginButton loginReducer={loginReducer} i18n={i18n} />)
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
    const wrapper = mount(<LoginButton loginReducer={loginReducer} i18n={i18n} />)
    expect(wrapper.find('img').props().src).toEqual(userIcon)
    expect(wrapper.find(Link).length).toEqual(3)
    expect(wrapper.find(Link).at(0).props().to).toEqual('/user/jloggedin')
    expect(wrapper.find(Link).at(1).props().to).toEqual('/user/jloggedin/edit')
    expect(wrapper.find(Link).at(2).props().to).toEqual('/user/logout')
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
    const wrapper = mount(<LoginButton loginReducer={loginReducer} i18n={i18n} />)
    expect(wrapper.find(Link).props().to).toEqual('/user')
    expect(wrapper.find(Link).props().children).toEqual('loginMenu.login')
  })
})
