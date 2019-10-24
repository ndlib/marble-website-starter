import React from 'react'
import { shallow } from 'enzyme'
import FollowButton from './'
import Link from 'components/Internal/Link'
import MaterialButton from 'components/Internal/MaterialButton'

describe('FollowButton', () => {
  console.log = jest.fn()

  test('!showButton', () => {
    const props = {
      showButton: false,
      username: 'lieutenant_user',
    }
    const wrapper = shallow(<FollowButton {...props} />)
    expect(wrapper.find(Link).props().to).toEqual('/user')
  })

  test('following', () => {
    const props = {
      showButton: true,
      username: 'lieutenant_user',
      following: true,
    }
    const wrapper = shallow(<FollowButton {...props} />)
    expect(wrapper.find(MaterialButton).html()).toContain('Unfollow')
    wrapper.find(MaterialButton).simulate('click')
  })

  test('default', () => {
    const props = {
      showButton: true,
      username: 'lieutenant_user',
    }
    const wrapper = shallow(<FollowButton {...props} />)
    expect(wrapper.find(MaterialButton).html()).toContain('Follow')
    wrapper.find(MaterialButton).simulate('click')
  })
})
