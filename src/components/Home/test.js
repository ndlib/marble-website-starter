import React from 'react'
import { shallow } from 'enzyme'
import Home from './'
import HomeCardGroups from './HomeCardGroups'
import Layout from 'components/Layout'

test('Home', () => {
  const wrapper = shallow(<Home location={{}} />)
  expect(wrapper.find(Layout).exists()).toBeTruthy()
  expect(wrapper.find(HomeCardGroups).exists()).toBeTruthy()
})
