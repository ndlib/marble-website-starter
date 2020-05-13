import React from 'react'
import { shallow } from 'enzyme'
import AppRouter from './'
import { Router } from '@reach/router'
import UserBasePath from 'components/App/Pages/User/UserBasePath'
import User from 'components/App/Pages/User'
import Portfolio from 'components/App/Pages/Portfolio'
describe('AppRouter', () => {
  test('AppRouter', () => {
    const props = {
      location: {},
    }
    const wrapper = shallow(<AppRouter {...props} />)
    expect(wrapper.find(Router).exists()).toBeTruthy()
    expect(wrapper.find(UserBasePath).props().path).toEqual('/user')
    expect(wrapper.find(User).length).toEqual(2)
    expect(wrapper.find(Portfolio).length).toEqual(1)
  })
})
