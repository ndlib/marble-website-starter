import React from 'react'
import { mount } from 'enzyme'
import UserTopMenu from './'
import HorizontalSubmenu from 'components/Internal/HorizontalSubmenu'

test('UserTopMenu', () => {
  const props = {
    username: 'fake_person',
    location: {
      pathname: '/user/fake_person',
    },
  }
  const wrapper = mount(<UserTopMenu {...props} />)
  expect(wrapper.find(HorizontalSubmenu).exists()).toBeTruthy()
  // click one button
  wrapper.find('button.inactive').simulate('click')
  // click the other
  wrapper.find('button.inactive').simulate('click')
})
