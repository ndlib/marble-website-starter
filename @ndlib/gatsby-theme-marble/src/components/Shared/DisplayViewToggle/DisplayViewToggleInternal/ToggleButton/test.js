import React from 'react'
import { shallow } from 'enzyme'
import ToggleButton from './'

test('ToggleButton', () => {
  const option = {
    display: 'option 1',
    inactiveIcon: 'inactive.svg',
    activeIcon: 'active.svg',
  }
  const action = jest.fn()
  const active = false
  const wrapper = shallow(<ToggleButton option={option} action={action} active={active} />)
  expect(wrapper.find('EmotionCssPropInternal').props().type).toEqual('image')
  expect(wrapper.find('EmotionCssPropInternal').props().src).toEqual('inactive.svg')
  expect(wrapper.find('EmotionCssPropInternal').props().alt).toEqual('option 1 view')
  wrapper.find('EmotionCssPropInternal').simulate('click')
  expect(action).toHaveBeenCalled()
})
