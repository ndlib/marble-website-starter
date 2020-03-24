import React from 'react'
import { shallow } from 'enzyme'
import SearchRefinementListFilter from './'
import {
  RefinementListFilter,
} from 'searchkit'

test('SearchPreMain', () => {
  const wrapper = shallow(<SearchRefinementListFilter
    label='testLabel'
    field='test'
    id='test'
    title='TestTitle'
    operator='OR'
    bucketsTransform='testy'
    size='12'
  />)
  expect(wrapper.find(RefinementListFilter).exists()).toBeTruthy()
})
