import React from 'react'
import { shallow } from 'enzyme'
import FollowButton from './'
import Link from 'components/Internal/Link'
import MaterialButton from 'components/Internal/MaterialButton'
import { Trans, useTranslation } from 'react-i18next'

describe('FollowButton', () => {
  console.log = jest.fn()
  jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }))
  test('!showButton', () => {
    const props = {
      showButton: false,
      userName: 'lieutenant_user',
    }
    const wrapper = shallow(<FollowButton {...props} />)
    expect(wrapper.find(Link).props().to).toEqual('/user')
  })

  test('following', () => {
    const props = {
      showButton: true,
      userName: 'lieutenant_user',
      following: true,
    }
    const wrapper = shallow(<FollowButton {...props} />)
    expect(wrapper.find(MaterialButton).html()).toContain('common:userMenu.unfollow')
    wrapper.find(MaterialButton).simulate('click')
  })

  test('default', () => {
    const props = {
      showButton: true,
      userName: 'lieutenant_user',
    }
    const wrapper = shallow(<FollowButton {...props} />)
    expect(wrapper.find(MaterialButton).html()).toContain('common:userMenu.follow')
    wrapper.find(MaterialButton).simulate('click')
  })
})
