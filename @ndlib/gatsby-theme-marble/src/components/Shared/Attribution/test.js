import React from 'react'
import { shallow } from 'enzyme'
import Attribution from './'

test('Attribution', () => {
  const wrapper = shallow(<Attribution><p className='child' /></Attribution>)
  expect(wrapper.find('.child').exists()).toBeTruthy()
})
