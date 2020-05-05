import React from 'react'
import { mount } from 'enzyme'
import ManifestImageGroup from './'
import ViewerLink from './ViewerLink'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'
import noImage from 'assets/images/noImage.svg'

console.error = jest.fn()

describe('ManifestImageGroup', () => {
  test('image', () => {
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

    expect(wrapper.find('section').exists()).toBeTruthy()
    expect(wrapper.find(ViewerLink).exists()).toBeTruthy()
    expect(wrapper.find(ExpandIcon).exists()).toBeTruthy()
    expect(wrapper.findWhere(img => {
      return img.prop('src') === '/image.png'
    }).exists()).toBeTruthy()
    expect(wrapper.find(ItemAlternateViews).exists()).toBeTruthy()
  })

  test('manifest, no image', () => {
    const wrapper = mount(<ManifestImageGroup iiifManifest={{ id: 'id' }} location={{}} />)
    expect(wrapper.find('section').exists()).toBeTruthy()
    expect(wrapper.find(ViewerLink).exists()).toBeTruthy()
    expect(wrapper.find(ExpandIcon).exists()).toBeTruthy()
    expect(wrapper.findWhere(img => {
      return img.prop('src') === noImage
    }).exists()).toBeTruthy()
    expect(wrapper.find(ItemAlternateViews).exists()).toBeTruthy()
  })

  test('no manifest', () => {
    const wrapper = mount(<ManifestImageGroup location={{}} />)
    expect(wrapper.find('section').exists()).toBeFalsy()
    expect(wrapper.find(ViewerLink).exists()).toBeFalsy()
    expect(wrapper.find(ExpandIcon).exists()).toBeFalsy()
    expect(wrapper.find('img').exists()).toBeFalsy()
    expect(wrapper.find(ItemAlternateViews).exists()).toBeFalsy()
  })
})
