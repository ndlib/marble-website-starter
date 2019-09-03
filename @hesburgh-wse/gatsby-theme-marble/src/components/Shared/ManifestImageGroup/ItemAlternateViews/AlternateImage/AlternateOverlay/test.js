import React from 'react'
import { shallow } from 'enzyme'
import AlternateOverlay from './'

test('renders null if not isLast', () => {
  const wrapper = shallow(<AlternateOverlay isLast={false} overlayNumber={3} />)
  expect(wrapper.find('.alternateOverlay').exists()).toBeFalsy()
})

test('renders overlay with overlay number', () => {
  const wrapper = shallow(<AlternateOverlay isLast overlayNumber={3} />)
  expect(wrapper.find('.alternateOverlay').exists()).toBeTruthy()
  expect(wrapper.find('.alternateOverlay').text()).toEqual('+3')
})
