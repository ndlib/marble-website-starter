import React from 'react'
import { shallow } from 'enzyme'
import SearchTools from './'
import {
  MultiList,
  SingleDataList,
  RangeSlider,
  MultiDropdownList,
} from '@appbaseio/reactivesearch'

test('SearchTools', () => {
  const wrapper = shallow(<SearchTools />)
  expect(wrapper.find(MultiList).exists()).toBeTruthy()
  expect(wrapper.find(SingleDataList).exists()).toBeTruthy()
  expect(wrapper.find(RangeSlider).exists()).toBeTruthy()
  expect(wrapper.find(MultiDropdownList).exists()).toBeTruthy()
})
