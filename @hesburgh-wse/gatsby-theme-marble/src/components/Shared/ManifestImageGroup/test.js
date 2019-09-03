import React from 'react'
import { shallow } from 'enzyme'
import ManifestImageGroup from './'
import ViewerLink from './ViewerLink'
import ManifestImage from 'components/Shared/ManifestImage'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'

const manifest = {
  id: 'id',
  slug: 'slug',
}
const wrapper = shallow(<ManifestImageGroup iiifManifest={manifest} location={{}} />)

test('ManifestImageGroup', () => {
  expect(wrapper.find('section').exists()).toBeTruthy()
  expect(wrapper.find(ViewerLink).exists()).toBeTruthy()
  expect(wrapper.find(ManifestImage).exists()).toBeTruthy()
  expect(wrapper.find(ExpandIcon).exists()).toBeTruthy()
  expect(wrapper.find(ItemAlternateViews).exists()).toBeTruthy()
})
