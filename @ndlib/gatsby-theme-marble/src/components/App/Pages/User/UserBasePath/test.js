import React from 'react'
import { shallow } from 'enzyme'
import UserBasePath from './'
import UserBasePathContent from './UserBasePathContent'
import Seo from 'components/Internal/Seo'

test('UserBasePath', () => {
  const props = {
    location: {},
  }
  const wrapper = shallow(<UserBasePath {...props} />)
  expect(wrapper.find(UserBasePathContent).exists()).toBeTruthy()
  expect(wrapper.find(Seo).exists()).toBeTruthy()
})
