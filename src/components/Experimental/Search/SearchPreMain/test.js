import React from 'react'
import { shallow } from 'enzyme'
import SearchPreMain from './'
import {
  DataSearch,
  SelectedFilters,
} from '@appbaseio/reactivesearch'
import Seo from 'components/Internal/Seo/'

test('SearchPreMain', () => {
  const wrapper = shallow(<SearchPreMain components={[]} />)
  expect(wrapper.find('.searchHead').exists()).toBeTruthy()
  expect(wrapper.find(Seo).props().title).toEqual('Search')
  expect(wrapper.find(DataSearch).exists()).toBeTruthy()
  expect(wrapper.find(SelectedFilters).exists()).toBeTruthy()
})
