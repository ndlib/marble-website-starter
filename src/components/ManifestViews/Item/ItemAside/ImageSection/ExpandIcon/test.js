import React from 'react'
import { shallow } from 'enzyme'
import ExpandIcon from './'

const wrapper = shallow(<ExpandIcon />)
test('Renders an svg element', () => {
  expect(wrapper.find('img').props().alt).toEqual('Open in Universal Viewer')
})
