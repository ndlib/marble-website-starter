import React from 'react'
import { shallow } from 'enzyme'
import { BookmarkGroup, sortCollections } from './'
import DropDown from 'components/Internal/DropDown'
import * as auth from 'utils/auth'

describe('BookmarkGroup', () => {
  test('not logged in', () => {
    const wrapper = shallow(<BookmarkGroup iiifManifest={{}} loginReducer={{}} />)
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
    const wrapper = shallow(<BookmarkGroup iiifManifest={{}} loginReducer={loginReducer} />)
    expect(wrapper.find(DropDown).exists()).toBeTruthy()
  })

  test('sortCollections - most recent (largest timestamp) first', () => {
    const data = {
      collections: [
        { updated: '03' },
        { updated: '01' },
        { updated: '10' },
      ],
    }
    const expected = [
      { updated: '10' },
      { updated: '03' },
      { updated: '01' },
    ]
    const actual = sortCollections(data)
    expect(actual).toEqual(expected)
  })
})
