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
    const ndJson = {
      id: 'id',
      slug: 'slug',
      items: [{
        iiifImageUri: 'http://image.place',
      }],
    }
    const wrapper = mount(<ManifestImageGroup ndJson={ndJson} location={{}} />)

    expect(wrapper.find('section').exists()).toBeTruthy()
    expect(wrapper.find(ViewerLink).exists()).toBeTruthy()
    expect(wrapper.find(ExpandIcon).exists()).toBeTruthy()
    expect(wrapper.findWhere(img => {
      return img.prop('src') === 'http://image.place/full/full/0/default.jpg'
    }).exists()).toBeTruthy()
    expect(wrapper.find(ItemAlternateViews).exists()).toBeTruthy()
  })

  test('manifest, no image', () => {
    const wrapper = mount(<ManifestImageGroup ndJson={{ id: 'id' }} location={{}} />)
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
