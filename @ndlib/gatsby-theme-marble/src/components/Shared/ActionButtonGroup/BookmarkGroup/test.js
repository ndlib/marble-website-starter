import React from 'react'
import { shallow } from 'enzyme'
import { BookmarkGroup, sortCollections } from './'
import DropDown from 'components/Shared/DropDown'
import * as auth from 'utils/auth'

describe('BookmarkGroup', () => {
  test('not logged in', () => {
    const wrapper = shallow(<BookmarkGroup marbleItem={{}} loginReducer={{}} />)
    expect(wrapper.find(DropDown).exists()).toBeFalsy()
  })
  test('logged in', () => {
    const isLoggedIn = jest.spyOn(auth, 'isLoggedIn')
    isLoggedIn.mockReturnValue(true)
    const loginReducer = {
      user: {
        userName: 'someDude',
      },
    }
    const wrapper = shallow(<BookmarkGroup marbleItem={{}} loginReducer={loginReducer} />)
    expect(wrapper.find(DropDown).exists()).toBeTruthy()
  })
})
