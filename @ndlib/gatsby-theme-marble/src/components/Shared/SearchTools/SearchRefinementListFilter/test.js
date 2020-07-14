import React from 'react'
import { shallow } from 'enzyme'
import { SearchRefinementListFilter, listOrder } from './'
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

const list = [
  { key: '1800-1899', doc_count: 7 },
  { key: '1700-1799', doc_count: 4 },
  { key: 'undated', doc_count: 4 },
  { key: '1600-1699', doc_count: 3 },
  { key: '1900-1999', doc_count: 1 }]

test('ListOrderNotAZ', () => {
  const testList = listOrder(list, 'not-a-z')
  expect(testList).toMatchObject([
    { key: '1800-1899', doc_count: 7 },
    { key: '1700-1799', doc_count: 4 },
    { key: 'undated', doc_count: 4 },
    { key: '1600-1699', doc_count: 3 },
    { key: '1900-1999', doc_count: 1 }])
})

test('ListOrderAZ', () => {
  const testList = listOrder(list, 'a-z')
  expect(testList).toMatchObject([
    { key: '1600-1699', doc_count: 3 },
    { key: '1700-1799', doc_count: 4 },
    { key: '1800-1899', doc_count: 7 },
    { key: '1900-1999', doc_count: 1 },
    { key: 'undated', doc_count: 4 }])
})
