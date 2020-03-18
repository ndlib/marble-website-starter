import React from 'react'
import { shallow } from 'enzyme'
import CampusLocation from './'

test('CampusLocation', () => {
  const wrapper = shallow(<CampusLocation metadata='child' />)
  expect(wrapper.find('dt').exists()).toBeTruthy()
})
