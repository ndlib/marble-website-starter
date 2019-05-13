import React from 'react'
import { shallow } from 'enzyme'
import AlternateOverlay from './'

test('renders null most of the time', () => {
  const wrapper = shallow(<AlternateOverlay index={0} max={2} length={5} />)
  expect(wrapper.find('.alternateOverlay').exists()).toBeFalsy()
})

test('renders overlay with overlay number', () => {
  const wrapper = shallow(<AlternateOverlay index={2} max={2} length={5} />)
  expect(wrapper.find('.alternateOverlay').exists()).toBeTruthy()
  expect(wrapper.find('.alternateOverlay').text()).toEqual('+3')
})
test('renders null when length === max', () => {
  const wrapper = shallow(<AlternateOverlay index={0} max={2} length={2} />)
  expect(wrapper.find('.alternateOverlay').exists()).toBeFalsy()
})
