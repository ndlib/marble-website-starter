import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import { UserCartouche } from './'

test.skip('UserCartouche', () => {
  const user = {
    email: 'me@service.mail',
    fullName: 'Dude McGuy',
    userName: 'dude',
  }
  navigate.mockImplementationOnce(() => {})
  const wrapper = shallow(<UserCartouche user={user} />)
  expect(wrapper.find('button').html()).toContain('Dude McGuy')
  wrapper.find('.cartouche').simulate('click')
  expect(navigate).toBeCalled()
})
