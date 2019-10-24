import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import UserCartouche from './'
import Gravatar from 'components/Internal/Gravatar'

test('UserCartouche', () => {
  const user = {
    email: 'me@service.mail',
    name: 'Dude McGuy',
    username: 'dude',
  }
  navigate.mockImplementationOnce(() => {})
  const wrapper = shallow(<UserCartouche user={user} />)
  expect(wrapper.find('.cartouche').props().role).toEqual('button')
  expect(wrapper.find(Gravatar).props().email).toEqual('me@service.mail')
  expect(wrapper.find('.cartouche').html()).toContain('Dude McGuy')
  wrapper.find('.cartouche').simulate('click')
  expect(navigate).toBeCalled()
})
