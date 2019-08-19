import React from 'react'
import { shallow } from 'enzyme'
import HamburgerButton from './'
import hamburgerIcon from 'assets/icons/svg/baseline-menu-24px-white.svg'

test('HamburgerButton', () => {
  const onClick = jest.fn()
  const onBlur = jest.fn()
  const className = 'myClass'

  const wrapper = shallow(<HamburgerButton onClick={() => onClick()} onBlur={() => onBlur()} className={className} />)
  expect(wrapper.find('img.myClass').props().src).toEqual(hamburgerIcon)
  expect(wrapper.find('img.myClass').props().alt).toEqual('Show Menu')
  wrapper.find('button').simulate('click')
  expect(onClick).toHaveBeenCalled()
  wrapper.find('button').simulate('blur')
  expect(onBlur).toHaveBeenCalled()
})
