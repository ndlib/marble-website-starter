import React from 'react'
import { shallow } from 'enzyme'
import {
  Hits,
  NoHits,
  InitialLoader,
} from 'searchkit'
import SearchResults from './'

describe('SearchResults', () => {
  test('default', () => {
    const wrapper = shallow(<SearchResults />)
    expect(wrapper.find(Hits).props().listComponent.props.defaultDisplay).toEqual('list')
    expect(wrapper.find(NoHits).exists()).toBeTruthy()
    expect(wrapper.find(InitialLoader).exists()).toBeTruthy()
  })
  test('grid', () => {
    const wrapper = shallow(<SearchResults defaultDisplay={'grid'} />)
    expect(wrapper.find(Hits).props().listComponent.props.defaultDisplay).toEqual('grid')
    expect(wrapper.find(NoHits).exists()).toBeTruthy()
    expect(wrapper.find(InitialLoader).exists()).toBeTruthy()
  })
})
