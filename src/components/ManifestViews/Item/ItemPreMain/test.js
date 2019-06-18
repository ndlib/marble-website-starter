import React from 'react'
import { shallow } from 'enzyme'
import ItemPreMain from './'
import ManifestSEO from 'components/ManifestViews/ManifestSEO'
import ReturnToSearch from 'components/Shared/ReturnToSearch'

const manifest = {
  label: 'a label',
  thumbnail: {
    '_id': 'picture.png',
  },
  description: 'a description',
}
const location = {
  some: 'object',
}
const wrapper = shallow(<ItemPreMain iiifManifest={manifest} location={location} />)

test('ItemPreMain', () => {
  expect(wrapper.find(ManifestSEO).props().iiifManifest).toEqual(manifest)
  expect(wrapper.find(ManifestSEO).props().location).toEqual({ some: 'object' })
  expect(wrapper.find(ReturnToSearch).props().location).toEqual({ some: 'object' })
})
