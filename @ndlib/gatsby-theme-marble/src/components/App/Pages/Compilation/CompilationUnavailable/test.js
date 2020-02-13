import React from 'react'
import { shallow } from 'enzyme'
import CompilationUnavailable from './'
import Seo from 'components/Internal/Seo'

test('CompilationUnavailable', () => {
  const props = {
    location: {},
    loginReducer: {},
  }
  const wrapper = shallow(<CompilationUnavailable {...props} />)
  expect(wrapper.find(Seo).props().title).toEqual(`Portfolio Unavailable`)
})
