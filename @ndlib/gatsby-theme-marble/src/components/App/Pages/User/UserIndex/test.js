import React from 'react'
import { shallow } from 'enzyme'
import UserIndex from './'
import NoUser from '../NoUser'
import UserLayout from '../UserLayout'
import CompilationList from './CompilationList'
import * as Auth from 'utils/auth'
import * as Util from 'utils/appUtils'

describe('UserIndex', () => {
  const props = {
    username: 'some_one',
    location: {},
    loginReducer: {},
  }
  test('no user', () => {
    jest.spyOn(Util, 'getUser').mockImplementationOnce(() => null)
    const wrapper = shallow(<UserIndex {...props} />)
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
    jest.spyOn(Util, 'getUserCompilations').mockImplementationOnce(() => {
      return []
    })
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    jest.spyOn(Auth, 'isLoggedIn').mockImplementationOnce(() => true)
    const wrapper = shallow(<UserIndex {...props} />)
    expect(wrapper.find(UserLayout).props().user).toEqual(fakeUser)
    expect(wrapper.find(CompilationList).props().isOwner).toEqual(true)
    expect(wrapper.find(CompilationList).props().loggedIn).toEqual(true)
  })
})
