import React from 'react'
import { shallow } from 'enzyme'
import Column from './'

test('Column', () => {
  const wrapper = shallow(<Column>Content</Column>)
  expect(wrapper.find('.columnWrapper').text()).toEqual('Content')
})
