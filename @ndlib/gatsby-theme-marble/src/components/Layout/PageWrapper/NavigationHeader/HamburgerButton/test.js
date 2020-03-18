import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import HamburgerButton from './'
import hamburgerIcon from 'assets/icons/svg/baseline-menu-24px-white.svg'

describe('HamburgerButton', () => {
  let sq
  const onClick = jest.fn()
  const onBlur = jest.fn()

  test('top menu exists', () => {
    sq = {
      site: {
        siteMetadata: {
          menus: {
            id: 'top',
            items: [{}],
          },
        },
      },
    }
    useStaticQuery.mockImplementationOnce(() => sq)
    const wrapper = shallow(<HamburgerButton onClick={() => onClick()} onBlur={() => onBlur()} />)
    expect(wrapper.find('img').props().src).toEqual(hamburgerIcon)
    expect(wrapper.find('img').props().alt).toEqual('Show Menu')
    wrapper.find('.hamburgerButton').simulate('click')
    expect(onClick).toHaveBeenCalled()
    wrapper.find('.hamburgerButton').simulate('blur')
    expect(onBlur).toHaveBeenCalled()
  })
  test('empty top menu', () => {
    sq = {
      site: {
        siteMetadata: {
          menus: {
            id: 'top',
            items: [],
          },
        },
      },
    }
    useStaticQuery.mockImplementationOnce(() => sq)
    const wrapper = shallow(<HamburgerButton onClick={() => onClick()} onBlur={() => onBlur()} />)
    expect(wrapper.find('.hamburgerButton').exists()).toBeFalsy()
  })
  test('no top menu', () => {
    sq = { site: {} }
    useStaticQuery.mockImplementationOnce(() => sq)
    const wrapper = shallow(<HamburgerButton onClick={() => onClick()} onBlur={() => onBlur()} />)
    expect(wrapper.find('.hamburgerButton').exists()).toBeFalsy()
  })
})
