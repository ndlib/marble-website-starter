import React from 'react'
import { shallow, mount } from 'enzyme'
import SearchFilterBox from './'
import { useStaticQuery, graphql } from 'gatsby'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'

describe('searchBoxDefaultText', () => {
  const sq = {
    site: {
      siteMetadata: {
        searchBoxDefaultText: 'Default Searchbox text',
      },
    },
  }

  test('SearchFilterBox', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })
    const wrapper = shallow(<SearchFilterBox />)
    expect(wrapper.find(SearchBox).exists()).toBeTruthy()
    expect(wrapper.find(SelectedFilters).exists()).toBeTruthy()
    expect(wrapper.find(ResetFilters).exists()).toBeTruthy()
  })
})
