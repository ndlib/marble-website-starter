import React from 'react'
import { shallow } from 'enzyme'
import HitDisplay, { HitList, HitGrid } from './'
import ManifestCard from 'components/Shared/ManifestCard'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'

const hits = [
  { _id: 'a', highlight: { allMetadata: ['data'] } },
  { _id: 'b', highlight: { allMetadata: ['data'] } },
  { _id: 'c', highlight: { allMetadata: ['data'] } },
]
test('HitList', () => {
  const wrapper = shallow(<HitList hits={hits} />)
  expect(wrapper.find(HitDisplay).props().defaultDisplay).toEqual('SEARCH_PAGE')
})

test('HitGrid', () => {
  const wrapper = shallow(<HitGrid hits={hits} />)
  expect(wrapper.find(HitDisplay).props().defaultDisplay).toEqual('COLLECTION_PAGE')
})

test('HitDisplay', () => {
  const wrapper = shallow(<HitDisplay hits={hits} />)
  expect(wrapper.find(DisplayViewToggle).exists()).toBeTruthy()
  expect(wrapper.find(ManifestCard).length).toEqual(3)
})
