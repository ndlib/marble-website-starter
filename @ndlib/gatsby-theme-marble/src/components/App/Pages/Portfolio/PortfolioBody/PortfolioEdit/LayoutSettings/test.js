import React from 'react'
import { shallow } from 'enzyme'
import LayoutSettings from './'
import RadioList from 'components/App/FormElements/RadioList'

test('LayoutSettings', () => {
  const props = {
    portfolio: {
      display: 'shared',
    },
  }
  const wrapper = shallow(<LayoutSettings {...props} />)
  expect(wrapper.find(RadioList).props().fieldName).toEqual('layoutDisplay')
  console.log = jest.fn()
  wrapper.find(RadioList).simulate('change')
  // expect an onChange function called
})
