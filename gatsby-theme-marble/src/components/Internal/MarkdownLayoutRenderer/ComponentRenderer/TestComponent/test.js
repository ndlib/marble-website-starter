import React from 'react'
import { shallow } from 'enzyme'
import TestComponent from './'

test('TestComponent', () => {
  const wrapper = shallow(<TestComponent component='IAmATest'>Child Content</TestComponent>)
  expect(wrapper.find('.IAmATest').exists()).toBeTruthy()
  expect(wrapper.find('em').text()).toEqual('IAmATest')
  expect(wrapper.find('.IAmATestChildren').text()).toEqual('Child Content')
})
