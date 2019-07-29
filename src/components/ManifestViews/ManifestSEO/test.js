import React from 'react'
import { shallow } from 'enzyme'
import SEO from 'components/Shared/Seo'
import ManifestSEO from './'

test('ManifestSEO', () => {
  const iiifManifest = {
    label: 'test title',
    thumbnail: { id: '/fake.png' },
    description: 'test description',
  }
  const location = {
    pathname: '/path/to/page',
  }
  const wrapper = shallow(<ManifestSEO iiifManifest={iiifManifest} location={location} />)
  expect(wrapper.find(SEO).props().title).toEqual('test title')
  expect(wrapper.find(SEO).props().image).toEqual('/fake.png')
  expect(wrapper.find(SEO).props().description).toEqual('test description')
  expect(wrapper.find(SEO).props().pathname).toEqual('/path/to/page')
})
