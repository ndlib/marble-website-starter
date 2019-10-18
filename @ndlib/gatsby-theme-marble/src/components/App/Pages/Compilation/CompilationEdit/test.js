import React from 'react'
import { mount } from 'enzyme'
import CompilationEdit from './'

test('CompilationEdit', () => {
  const props = {
    compilation: {
      items: [],
    },
    loginReducer: {},
  }
  const wrapper = mount(<CompilationEdit {...props} />)
  expect(wrapper.find('.wrapper'))
  // click one button
  wrapper.find('button.inactive').simulate('click')
  // click the other
  wrapper.find('button.inactive').simulate('click')
})
