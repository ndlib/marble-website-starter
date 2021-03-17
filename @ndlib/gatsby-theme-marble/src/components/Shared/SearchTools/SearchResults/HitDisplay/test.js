import React from 'react'
import { shallow } from 'enzyme'
import HitDisplay, { HitList, HitGrid } from './'
import HitResult from './HitResult'
import CardGroup from 'components/Shared/CardGroup'

const hits = [
  { _id: 'a', highlight: { 'allMetadata.folded': ['<em>data</em>'] } },
  { _id: 'b', highlight: { 'creator.folded': [] } },
  { _id: 'c', highlight: { 'allMetadata.folded': ['data::<em>line2data</em>'] } },
]
test('HitList', () => {
  const wrapper = shallow(<HitList hits={hits} />)
  expect(wrapper.find(HitDisplay).props().defaultDisplay).toEqual('list')
})

test('HitGrid', () => {
  const wrapper = shallow(<HitGrid hits={hits} />)
  expect(wrapper.find(HitDisplay).props().defaultDisplay).toEqual('grid')
})

test('HitDisplay', () => {
  const wrapper = shallow(<HitDisplay hits={hits} />)
  expect(wrapper.find(CardGroup).exists()).toBeTruthy()
  expect(wrapper.find(HitResult).length).toEqual(3)
})

test('has no cards if the hits are empty', () => {
  const wrapper = shallow(<HitDisplay hits={[]} />)
  expect(wrapper.find(HitResult).length).toEqual(0)
})
