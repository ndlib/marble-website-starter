import React from 'react'
import { shallow } from 'enzyme'
import NavigationHeader, { closeOnBlur } from './'
import SiteLogo from './SiteLogo'
import LoginButton from './LoginButton'
import Menu from 'components/Shared/Menu'
import HamburgerButton from './HamburgerButton'

describe('NavigationHeader', () => {
  const location = {
    href: '/somepage',
  }
  const wrapper = shallow(<NavigationHeader location={location} />)

  test('renders', () => {
    // expect(wrapper.find('header').exists()).toBeTruthy()
    expect(wrapper.find(SiteLogo).exists()).toBeTruthy()
    expect(wrapper.find(Menu).props().variant).toEqual('header')
    expect(wrapper.find(LoginButton).exists()).toBeTruthy()
    expect(wrapper.find(HamburgerButton).exists()).toBeTruthy()
  })
})

describe('closeOnBlur', () => {
  const toggleAction = jest.fn()
  test('does not call toggle', () => {
    const event = {
      relatedTarget: {
        href: '/browse',
      },
    }
    const location = {
      href: '/not-browse',
    }
    closeOnBlur(event, toggleAction, location)
    expect(toggleAction).not.toHaveBeenCalled()
  })
  test('calls toggle', () => {
    const event = {}
    const location = {
      href: '/not-browse',
    }
    closeOnBlur(event, toggleAction, location)
    expect(toggleAction).toHaveBeenCalled()
  })
})
