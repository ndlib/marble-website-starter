import React from 'react'
import { shallow } from 'enzyme'
import CollectionPreMain from './'
import ManifestSEO from 'components/ManifestViews/ManifestSEO'
import ReturnToSearch from 'components/Shared/ReturnToSearch'
import Image from 'components/Shared/Image'

const location = { my: 'location' }
const manifest = {
  label: 'a title',
  thumbnail: {
    '_id': 'example.jpg',
  },
  description: 'some text',
}

const wrapper = shallow(<CollectionPreMain location={location} iiifManifest={manifest} />)

test('CollectionPreMain', () => {
  expect(wrapper.find(ManifestSEO).props().iiifManifest).toEqual(manifest)
  expect(wrapper.find(ManifestSEO).props().location).toEqual({ my: 'location' })
  expect(wrapper.find(Image).props().alt).toEqual('a title')
  expect(wrapper.find(ReturnToSearch).props().location).toEqual({ my: 'location' })
})
