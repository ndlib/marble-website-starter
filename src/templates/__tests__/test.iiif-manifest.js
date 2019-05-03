import React from 'react'
import { shallow } from 'enzyme'
import { ItemTemplate } from '../iiif-manifest'

test('it renders the manifest template', () => {
  const data = {
    iiifManifest: { id: 'manifest' },
  }
  const location = { object: 'object' }


  const wrapper = shallow(<ItemTemplate data={data} location={location}/>)
  expect(wrapper.find('Item').exists()).toBeTruthy()
  expect(wrapper.find('Item').prop('iiifManifest')).toEqual({ id: 'manifest' })
  expect(wrapper.find('Item').prop('location')).toEqual({ object: 'object' })  
})
