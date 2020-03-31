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
  { key: '19th Century', doc_count: 7 },
  { key: '18th Century', doc_count: 4 },
  { key: 'undated', doc_count: 4 },
  { key: '17th Century', doc_count: 3 },
  { key: '20th Century', doc_count: 1 }]

test('ListOrderNotAZ', () => {
  const testList = listOrder(list, 'not-a-z')
  expect(testList).toMatchObject([
    { key: '19th Century', doc_count: 7 },
    { key: '18th Century', doc_count: 4 },
    { key: 'undated', doc_count: 4 },
    { key: '17th Century', doc_count: 3 },
    { key: '20th Century', doc_count: 1 }])
})

test('ListOrderAZ', () => {
  const testList = listOrder(list, 'a-z')
  expect(testList).toMatchObject([
    { key: '17th Century', doc_count: 3 },
    { key: '18th Century', doc_count: 4 },
    { key: '19th Century', doc_count: 7 },
    { key: '20th Century', doc_count: 1 },
    { key: 'undated', doc_count: 4 }])
})
