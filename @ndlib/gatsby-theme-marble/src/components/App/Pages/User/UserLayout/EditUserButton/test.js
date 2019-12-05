import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import EditUserButton from './'
import MaterialButton from 'components/Internal/MaterialButton'

test('EditUserButton', () => {
  const wrapper = shallow(<EditUserButton username='captainuser' />)
  expect(wrapper.find(MaterialButton).html()).toContain('Edit Profile')
  wrapper.find(MaterialButton).simulate('click')
  expect(navigate).toHaveBeenCalledWith('/user/captainuser/edit')
})
