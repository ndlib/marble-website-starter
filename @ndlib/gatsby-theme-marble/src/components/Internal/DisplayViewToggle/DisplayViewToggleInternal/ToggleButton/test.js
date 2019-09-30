import React from 'react'
import { shallow } from 'enzyme'
import ToggleButton from './'

test('ToggleButton', () => {
  const icon = 'test.svg'
  const option = 'option 1'
  const action = jest.fn()
  const active = false
  const wrapper = shallow(<ToggleButton icon={icon} option={option} action={action} active={active} />)

  expect(wrapper.find('input.notSelected').props().type).toEqual('image')
  expect(wrapper.find('input').props().src).toEqual(icon)
  expect(wrapper.find('input').props().alt).toEqual('option 1 view')
  wrapper.find('input').simulate('click')
  expect(action).toHaveBeenCalled()
})
