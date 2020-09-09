import React from 'react'
import { shallow } from 'enzyme'
import HitDisplay, { HitList, HitGrid } from './'
import ManifestCard from 'components/Shared/ManifestCard'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'

const hits = [
  { _id: 'a', highlight: { 'allMetadata.folded': ['<em>data</em>'] } },
  { _id: 'b', highlight: { 'creator.folded': [] } },
  { _id: 'c', highlight: { 'allMetadata.folded': ['data::<em>line2data</em>'] } },
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

test('all metadata hightlights', () => {
  const wrapper = shallow(<HitDisplay hits={hits} />)
  expect(wrapper.find(DisplayViewToggle).exists()).toBeTruthy()
  expect(wrapper.find(ManifestCard).at(0).children().html()).toEqual('<div class="css-1itje8o"><em>data</em></div>')
  expect(wrapper.find(ManifestCard).at(2).children().html()).toEqual('<div class="css-1itje8o"><em>line2data</em></div>')
})

test('all metadata hightlights splits on :: and shows only the line with the data', () => {
  const wrapper = shallow(<HitDisplay hits={hits} />)
  expect(wrapper.find(DisplayViewToggle).exists()).toBeTruthy()
  expect(wrapper.find(ManifestCard).at(2).children().html()).toEqual('<div class="css-1itje8o"><em>line2data</em></div>')
})
