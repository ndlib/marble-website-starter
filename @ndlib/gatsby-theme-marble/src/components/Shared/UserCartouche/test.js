import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import { UserCartouche } from './'
import Gravatar from 'components/Shared/Gravatar'

test('UserCartouche', () => {
  const user = {
    email: 'me@service.mail',
    fullName: 'Dude McGuy',
    userName: 'dude',
  }
  navigate.mockImplementationOnce(() => {})
  const wrapper = shallow(<UserCartouche user={user} loginReducer={{}} />)
  expect(wrapper.find(Gravatar).props().email).toEqual('me@service.mail')
  expect(wrapper.find('button').html()).toContain('Dude McGuy')
  wrapper.find('.cartouche').simulate('click')
  expect(navigate).toBeCalled()
})
