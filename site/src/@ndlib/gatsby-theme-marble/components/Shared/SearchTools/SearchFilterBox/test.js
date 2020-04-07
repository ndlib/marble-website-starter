import React from 'react'
import { shallow } from 'enzyme'
import SearchFilterBox from './'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'

test('SearchPreMain', () => {
  const wrapper = shallow(<SearchFilterBox />)
  expect(wrapper.find('.searchHead').exists()).toBeTruthy()
  expect(wrapper.find(SearchBox).exists()).toBeTruthy()
  expect(wrapper.find(SelectedFilters).exists()).toBeTruthy()
  expect(wrapper.find(ResetFilters).exists()).toBeTruthy()
})
