import React from 'react'
import { shallow } from 'enzyme'
import { AppRouter, mapStateToProps, mapDispatchToProps } from './'
import { Router } from '@reach/router'
import UserBasePath from 'components/App/Pages/User/UserBasePath'
import UserIndex from 'components/App/Pages/User/UserIndex'
import UserEdit from 'components/App/Pages/User/UserEdit'
import UserFollowing from 'components/App/Pages/User/UserFollowing'
import Compilation from 'components/App/Pages/Compilation'
describe('AppRouter', () => {
  test('AppRouter', () => {
    const props = {
      location: {},
      loginReducer: {},
      dispatch: jest.fn(),
    }
    const wrapper = shallow(<AppRouter {...props} />)
    expect(wrapper.find(Router).exists()).toBeTruthy()
    expect(wrapper.find(UserBasePath).props().path).toEqual('/user')
    expect(wrapper.find(UserIndex).props().path).toEqual('/user/:userName')
    expect(wrapper.find(UserEdit).props().path).toEqual('/user/:userName/edit')
    expect(wrapper.find(UserFollowing).props().path).toEqual('/user/:userName/following')
    expect(wrapper.find(Compilation).length).toEqual(2)
  })
  test('mapStateToProps', () => {
    expect(mapStateToProps({ some: 'state' })).toEqual({ some: 'state' })
  })
  test('mapDispatchToProps', () => {
    expect(mapDispatchToProps(jest.fn)).toEqual({ dispatch: jest.fn })
  })
})
