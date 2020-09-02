import React from 'react'
import { shallow } from 'enzyme'
import SearchFilterBox from './'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

describe('searchBoxDefaultText', () => {
  test('SearchFilterBox', () => {
    const wrapper = shallow(<SearchFilterBox i18n={i18n} />)
    expect(wrapper.find(SearchBox).exists()).toBeTruthy()
    expect(wrapper.find(SelectedFilters).exists()).toBeTruthy()
    expect(wrapper.find(ResetFilters).exists()).toBeTruthy()
    expect(wrapper.find(SearchBox).props().placeholder).toEqual('search.prompt')
  })
})
