import React from 'react'
import { shallow } from 'enzyme'
import Ownership from './'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import Attribution from 'components/Internal/Attribution'
import UserCartouche from 'components/Internal/UserCartouche'
import * as Auth from 'utils/auth'

describe('Ownership', () => {
  const fakeUser = {
    username: 'fake_user',
    name: 'fake user',
    email: 'user.mail',
  }
  const props = {
    compilation: {
      user: fakeUser,
      visibility: 'public',
    },
    loginReducer: {},
  }
  test('isOwner', () => {
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    const wrapper = shallow(<Ownership {...props} />)
    expect(wrapper.find(VisibilityLabel).props().visibility).toEqual('public')
  })
  test('not isOwner', () => {
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => false)
    const wrapper = shallow(<Ownership {...props} />)
    expect(wrapper.find(UserCartouche).props().user).toEqual(fakeUser)
  })
})
