import React from 'react'
import { shallow } from 'enzyme'
import UserFollowing from './'
import NoUser from '../NoUser'
import UserLayout from '../UserLayout'
import * as Util from 'utils/appUtils'

describe('UserFollowing', () => {
  const props = {
    username: 'some_one',
    location: {},
    loginReducer: {},
  }
  test('no user', () => {
    jest.spyOn(Util, 'getUser').mockImplementationOnce(() => null)
    const wrapper = shallow(<UserFollowing {...props} />)
    expect(wrapper.find(NoUser).exists()).toBeTruthy()
  })
  test('valid user', () => {
    const fakeUser = {
      username: 'someone_else',
      name: 'A Person',
      email: 'person@mail.web',
      bio: null,
    }

    jest.spyOn(Util, 'getUser').mockImplementationOnce(() => fakeUser)
    const wrapper = shallow(<UserFollowing {...props} />)
    expect(wrapper.find(NoUser).exists()).toBeFalsy()
    expect(wrapper.find(UserLayout).props().user).toEqual(fakeUser)
  })
})
