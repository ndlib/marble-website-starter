import React from 'react'
import { shallow } from 'enzyme'
import VisibilitySettings from './'
import RadioList from 'components/App/FormElements/RadioList'

test('VisibilitySettings', () => {
  const props = {
    portfolio: {
      visibility: 'shared',
    },
    onChange: jest.fn(),
  }
  const wrapper = shallow(<VisibilitySettings {...props} />)
  expect(wrapper.find(RadioList).props().fieldName).toEqual('visibility')
  console.log = jest.fn()
  wrapper.find(RadioList).simulate('change')
  // expect an onChange function called
})
