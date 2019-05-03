import React from 'react'
import { shallow } from 'enzyme'
import { CollectionTemplate } from '../iiif-collection'

test('it renders the collection template', () => {
  const data = {
    iiifManifest: { id: 'manifest' },
  }
  const location = { object: 'object' }

  const wrapper = shallow(<CollectionTemplate data={data} location={location} />)
  expect(wrapper.find('Collection').exists()).toBeTruthy()
  expect(wrapper.find('Collection').prop('iiifManifest')).toEqual({ id: 'manifest' })
  expect(wrapper.find('Collection').prop('location')).toEqual({ object: 'object' })
})
