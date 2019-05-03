import React from 'react'
import { shallow } from 'enzyme'
import { ItemTemplate } from '../iiif-manifest'

test('it renders the manifest template', () => {
  const data = {
    iiifManifest: { id: 'manifest' }
  }

  const wrapper = shallow(<ItemTemplate data={data} />)
  expect(wrapper.find('Item').exists()).toBeTruthy()
  expect(wrapper.find('Item').prop('iiifManifest')).toEqual({ id: 'manifest' })
})
