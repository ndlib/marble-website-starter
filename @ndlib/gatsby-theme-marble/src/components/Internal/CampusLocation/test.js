import React from 'react'
import { shallow } from 'enzyme'
import CampusLocation from './'

test('CampusLocation renders', () => {
  const wrapper = shallow(<CampusLocation metadata='child' />)
  expect(wrapper.find('dl').exists()).toBeTruthy()
})

test('CampusLocation', () => {
  const wrapper = shallow(<CampusLocation metadata='Test Location' />)
  expect(wrapper.find('dd').text()).toEqual('Test Location')
})
