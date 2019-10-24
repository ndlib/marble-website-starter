import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import UserEdit from './'
import * as Auth from 'utils/auth'
import * as Util from 'utils/appUtils'
import UserLayout from '../UserLayout'
import NoUser from '../NoUser'
import MaterialButton from 'components/Internal/MaterialButton'

describe('UserEdit', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const fakeUser = {
    username: 'someone_else',
    name: 'A Person',
    email: 'person@mail.web',
    bio: null,
  }
  const props = {
    username: 'someone_else',
    location: {},
    loginReducer: {},
  }

  test('no user', () => {
    jest.spyOn(Util, 'getUser').mockImplementationOnce(() => null)
    const wrapper = shallow(<UserEdit {...props} />)
    expect(wrapper.find(NoUser).exists()).toBeTruthy()
  })

  test('not your page', () => {
    jest.spyOn(Util, 'getUser').mockImplementationOnce(() => fakeUser)
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => false)
    shallow(<UserEdit {...props} />)
    expect(navigate).toBeCalledWith('/user/someone_else')
  })

  describe('your page', () => {
    let wrapper
    const event = { preventDefault: () => jest.fn() }
    beforeEach(() => {
      props.loginReducer = {
        user: fakeUser,
      }
      jest.spyOn(Util, 'getUser').mockImplementationOnce(() => fakeUser)
      jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
      wrapper = shallow(<UserEdit {...props} />)
    })

    test('render', () => {
      expect(wrapper.find(UserLayout).props().user).toEqual(fakeUser)
    })
    test('click save', () => {
      wrapper.find(MaterialButton).at(1).simulate('click', event)
      expect(navigate).toBeCalledWith('/user/someone_else')
    })
    test('click cancel - ok', () => {
      jest.spyOn(window, 'confirm').mockImplementationOnce(() => true)
      wrapper.find(MaterialButton).at(0).simulate('click', event)
      expect(navigate).toBeCalledWith('/user/someone_else')
    })
    test('click cancel - cancel', () => {
      jest.spyOn(window, 'confirm').mockImplementationOnce(() => false)
      wrapper.find(MaterialButton).at(0).simulate('click', event)
      expect(navigate).not.toBeCalled()
    })
  })
})
