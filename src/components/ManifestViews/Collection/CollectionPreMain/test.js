import React from 'react'
import { shallow } from 'enzyme'
import CollectionPreMain from './'
import SEO from 'components/Shared/Seo'
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
  expect(wrapper.find(SEO).props().title).toEqual('a title')
  expect(wrapper.find(SEO).props().image).toEqual('example.jpg')
  expect(wrapper.find(SEO).props().description).toEqual('some text')
  expect(wrapper.find(Image).props().alt).toEqual('a title')
  expect(wrapper.find(ReturnToSearch).props().location).toEqual({ my: 'location' })
})
