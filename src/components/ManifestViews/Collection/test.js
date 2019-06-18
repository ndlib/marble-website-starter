import React from 'react'
import { shallow } from 'enzyme'
import { Collection } from './'
import Layout from 'components/Layout'
import DisplayViewToggle from 'components/Shared/DisplayViewToggle'
import Card from 'components/Shared/Card'

const location = { some: 'place' }
const manifest = {
  id: 'main',
  label: 'a title',
  childrenIiifManifest: [
    {
      id: '1',
      slug: '1',
      label: 'title 1',
    },
    {
      id: '2',
      slug: '2',
      label: 'title 2',
    },
    {
      id: '3',
      slug: '3',
      label: 'title 3',
    },
  ],
}

const wrapper = shallow(<Collection location={location} iiifManifest={manifest} displayReducer={{}} />)

test('Collection', () => {
  expect(wrapper.find(Layout).props().title).toEqual('a title')
  expect(wrapper.find(DisplayViewToggle).exists()).toBeTruthy()
  expect(wrapper.find(Card).at(1).props().target).toEqual('/2')
  expect(wrapper.find(Card).at(1).props().label).toEqual('title 2')
  expect(wrapper.find(Card).at(1).props().iiifManifest).toEqual({
    id: '2',
    slug: '2',
    label: 'title 2',
  })
  expect(wrapper.find(Card).at(1).props().location).toEqual({ some: 'place' })
})
