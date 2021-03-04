import React from 'react'
import { shallow } from 'enzyme'
import FollowButton from './'
import Link from 'components/Shared/Link'
import MaterialButton from 'components/Shared/MaterialButton'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

describe('FollowButton', () => {
  console.log = jest.fn()
  jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }))
  test('!showButton', () => {
    const props = {
      showButton: false,
      userName: 'lieutenant_user',
    }
    const wrapper = shallow(<FollowButton {...props} i18n={i18n} />)
    expect(wrapper.find(Link).props().to).toEqual('/user')
  })

  test('following', () => {
    const props = {
      showButton: true,
      userName: 'lieutenant_user',
      following: true,
    }
    const wrapper = shallow(<FollowButton {...props} i18n={i18n} />)
    expect(wrapper.find(MaterialButton).html()).toContain('userMenu.unfollow')
    wrapper.find(MaterialButton).simulate('click')
  })

  test('default', () => {
    const props = {
      showButton: true,
      userName: 'lieutenant_user',
    }
    const wrapper = shallow(<FollowButton {...props} i18n={i18n} />)
    expect(wrapper.find(MaterialButton).html()).toContain('userMenu.follow')
    wrapper.find(MaterialButton).simulate('click')
  })
})
