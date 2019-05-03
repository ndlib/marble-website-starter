import React from 'react'
import { shallow } from 'enzyme'
import Loading from './'

const wrapper = shallow(<Loading />)

test('Loading component, gotta test \'em all.', () => {
  expect(wrapper.find('.skThreeBounce').exists()).toBeTruthy()
  expect(wrapper.find('.skBounce1').exists()).toBeTruthy()
  expect(wrapper.find('.skBounce2').exists()).toBeTruthy()
  expect(wrapper.find('.skBounce3').exists()).toBeTruthy()
  expect(wrapper.find('.skChild').length).toEqual(3)
})
