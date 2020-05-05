import React from 'react'
import { mount } from 'enzyme'
import ManifestImageGroup from './'
import ViewerLink from './ViewerLink'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'

console.error = jest.fn()

const manifest = {
  id: 'id',
  slug: 'slug',
  items: [{
    items: [{
      items: [{
        body: {
          id: '/image.png',
        },
      }],
    }],
  }],
}
const wrapper = mount(<ManifestImageGroup iiifManifest={manifest} location={{}} />)

test('ManifestImageGroup', () => {
  expect(wrapper.find('section').exists()).toBeTruthy()
  expect(wrapper.find(ViewerLink).exists()).toBeTruthy()
  expect(wrapper.find(ExpandIcon).exists()).toBeTruthy()
  expect(wrapper.findWhere(img => {
    return img.prop('src') === '/image.png'
  }).exists()).toBeTruthy()
  expect(wrapper.find(ItemAlternateViews).exists()).toBeTruthy()
})
