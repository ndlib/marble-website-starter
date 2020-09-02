import React from 'react'
import { shallow } from 'enzyme'
import LayoutSettings from './'
import RadioList from 'components/App/FormElements/RadioList'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

test('LayoutSettings', () => {
  const props = {
    portfolio: {
      display: 'shared',
    },
    onChange: jest.fn(),
  }
  const wrapper = shallow(<LayoutSettings {...props} i18n={i18n} />)
  expect(wrapper.find(RadioList).props().fieldName).toEqual('layoutDisplay')
  console.log = jest.fn()
  wrapper.find(RadioList).simulate('change')
  // expect an onChange function called
})
