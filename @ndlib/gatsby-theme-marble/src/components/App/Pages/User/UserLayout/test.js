import React from 'react'
import { shallow } from 'enzyme'
import { UserLayout } from './'
import * as Auth from 'utils/auth'
import Seo from 'components/Internal/Seo'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import Gravatar from 'components/Internal/Gravatar'
import EditUserButton from './EditUserButton'
import LogOut from 'components/Shared/LoginArea/LogOut'

describe('UserLayout', () => {
  test('ownsPage', () => {
    const props = {
      user: {
        userName: 'person_user',
        email: 'me@email.web',
        fullName: 'Person User',
        bio: 'some bio',
      },
      location: {},
      loginReducer: {
        user: {
          userName: 'person_user',
        },
      },
    }
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    const wrapper = shallow(<UserLayout {...props}><div className='childContent' /></UserLayout>)
    expect(wrapper.find(Seo).props().title).toEqual('person_user')
    expect(wrapper.find(MultiColumn).props().columns).toEqual('5')
    expect(wrapper.find(Column).length).toEqual(2)
    expect(wrapper.find(Gravatar).props().email).toEqual('me@email.web')
    expect(wrapper.find('.identityGroup').html()).toContain('Person User')
    expect(wrapper.find('.identityGroup').html()).toContain('person_user')
    expect(wrapper.find('.childContent').exists()).toBeTruthy()
    expect(wrapper.find('.bio').html()).toContain('some bio')
    // different for ownership status
    expect(wrapper.find(EditUserButton).props().userName).toEqual('person_user')
    expect(wrapper.find(LogOut).exists()).toBeTruthy()
  })
  test('does not ownsPage', () => {
    const props = {
      user: {
        userName: 'person_user',
        email: 'me@email.web',
        fullName: 'Person User',
        bio: 'some bio',
      },
      location: {},
      loginReducer: {},
    }
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => false)
    jest.spyOn(Auth, 'isLoggedIn').mockImplementationOnce(() => false)
    const wrapper = shallow(<UserLayout {...props}><div className='childContent' /></UserLayout>)
    expect(wrapper.find(Seo).props().title).toEqual('person_user')
    expect(wrapper.find(MultiColumn).props().columns).toEqual('5')
    expect(wrapper.find(Column).length).toEqual(2)
    expect(wrapper.find(Gravatar).props().email).toEqual('me@email.web')
    expect(wrapper.find('.identityGroup').html()).toContain('Person User')
    expect(wrapper.find('.identityGroup').html()).toContain('person_user')
    expect(wrapper.find('.childContent').exists()).toBeTruthy()
    expect(wrapper.find('.bio').html()).toContain('some bio')
    // different for ownership status
    expect(wrapper.find(EditUserButton).exists()).toBeFalsy()
    expect(wrapper.find(LogOut).exists()).toBeFalsy()
  })
})
