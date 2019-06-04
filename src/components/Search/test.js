import React from 'react'
import { shallow } from 'enzyme'
import { Search, components } from './'
import Layout from 'components/Layout'
import SearchResults from './SearchResults'
import { ReactiveBase } from '@appbaseio/reactivesearch'

test('Search', () => {
  const searchBase = {
    app: 'myApp',
    url: 'http://search.url',
  }
  const location = {}
  const displayReducer = {}

  const wrapper = shallow(<Search searchBase={searchBase} location={location} displayReducer={displayReducer} />)
  expect(wrapper.find(ReactiveBase).props().app).toEqual('myApp')
  expect(wrapper.find(ReactiveBase).props().url).toEqual('http://search.url')
  expect(wrapper.find(Layout).exists()).toBeTruthy()
  expect(wrapper.find(SearchResults).props().components).toEqual(components)
})
