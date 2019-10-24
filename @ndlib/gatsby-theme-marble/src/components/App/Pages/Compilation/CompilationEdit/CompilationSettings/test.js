import React from 'react'
import { shallow } from 'enzyme'
import CompilationSettings from './'

test('CompilationSettings', () => {
  const props = {
    compilation: {
      title: 'title',
      description: 'description',
    },
    className: 'myClass',
  }
  const wrapper = shallow(<CompilationSettings {...props} />)
  expect(wrapper.find('.myClass').exists()).toBeTruthy()
})
