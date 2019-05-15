import React from 'react'
import { shallow } from 'enzyme'
import SkipToMain from './'

test('SkipToMain', () => {
  const wrapper = shallow(<SkipToMain />)
  expect(wrapper.find('a.skipToMain').props().href).toEqual('#mainContent')
  expect(wrapper.find('a.skipToMain').text()).toEqual('Skip to main content.')
})
