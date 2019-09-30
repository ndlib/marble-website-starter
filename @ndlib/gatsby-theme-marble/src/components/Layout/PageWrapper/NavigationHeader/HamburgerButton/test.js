import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import HamburgerButton from './'
import hamburgerIcon from 'assets/icons/svg/baseline-menu-24px-white.svg'

describe('HamburgerButton', () => {
  let sq
  const onClick = jest.fn()
  const onBlur = jest.fn()
  const className = 'myClass'

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
    const wrapper = shallow(<HamburgerButton onClick={() => onClick()} onBlur={() => onBlur()} className={className} />)
    expect(wrapper.find('img.myClass').props().src).toEqual(hamburgerIcon)
    expect(wrapper.find('img.myClass').props().alt).toEqual('Show Menu')
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
    const wrapper = shallow(<HamburgerButton onClick={() => onClick()} onBlur={() => onBlur()} className={className} />)
    expect(wrapper.find('.hamburgerButton').exists()).toBeFalsy()
  })
  test('no top menu', () => {
    sq = { site: {} }
    useStaticQuery.mockImplementationOnce(() => sq)
    const wrapper = shallow(<HamburgerButton onClick={() => onClick()} onBlur={() => onBlur()} className={className} />)
    expect(wrapper.find('.hamburgerButton').exists()).toBeFalsy()
  })
})
