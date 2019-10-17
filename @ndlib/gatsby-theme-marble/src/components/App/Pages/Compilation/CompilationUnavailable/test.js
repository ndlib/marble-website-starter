import React from 'react'
import { shallow } from 'enzyme'
import CompilationUnavailable, { title } from './'
import Layout from 'components/Layout'

test('CompilationUnavailable', () => {
  const props = {
    location: {},
    loginReducer: {},
  }
  const wrapper = shallow(<CompilationUnavailable {...props} />)
  expect(wrapper.find(Layout).props().title).toEqual(title)
})
