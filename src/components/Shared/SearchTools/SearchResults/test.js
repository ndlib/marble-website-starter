import React from 'react'
import { shallow } from 'enzyme'
import {
  Hits,
  NoHits,
  InitialLoader,
} from 'searchkit'
import SearchResults from './'
import {
  HitList,
  HitGrid,
} from './HitDisplay'

describe('SearchResults', () => {
  test('default', () => {
    const wrapper = shallow(<SearchResults />)
    expect(wrapper.find(Hits).props().listComponent).toEqual(HitList)
    expect(wrapper.find(NoHits).exists()).toBeTruthy()
    expect(wrapper.find(InitialLoader).exists()).toBeTruthy()
  })
  test('grid', () => {
    const wrapper = shallow(<SearchResults defaultDisplay={'grid'} />)
    expect(wrapper.find(Hits).props().listComponent).toEqual(HitGrid)
    expect(wrapper.find(NoHits).exists()).toBeTruthy()
    expect(wrapper.find(InitialLoader).exists()).toBeTruthy()
  })
})
