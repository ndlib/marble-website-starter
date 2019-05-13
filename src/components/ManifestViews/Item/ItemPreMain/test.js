import React from 'react'
import { shallow } from 'enzyme'
import ItemPreMain from './'
import SEO from 'components/Shared/Seo'
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
  expect(wrapper.find(SEO).props().title).toEqual('a label')
  expect(wrapper.find(SEO).props().image).toEqual('picture.png')
  expect(wrapper.find(SEO).props().description).toEqual('a description')
  expect(wrapper.find(ReturnToSearch).props().location).toEqual({ some: 'object' })
})
