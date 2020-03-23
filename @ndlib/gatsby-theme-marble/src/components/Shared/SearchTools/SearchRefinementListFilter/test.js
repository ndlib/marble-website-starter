import React from 'react'
import { shallow } from 'enzyme'
import SearchRefinementListFilter from './'
import {
  RefinementListFilter,
} from 'searchkit'

test.skip('SearchPreMain', () => {
  const wrapper = shallow(<SearchRefinementListFilter />)
  expect(wrapper.find(RefinementListFilter).exists()).toBeTruthy()
})
