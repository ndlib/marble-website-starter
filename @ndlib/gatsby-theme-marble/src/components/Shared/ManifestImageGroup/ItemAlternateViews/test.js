import React from 'react'
import { shallow } from 'enzyme'
import ItemAlternateViews from './'
import AlternateImage from './AlternateImage'

describe('ItemAlternateViews', () => {
  const location = {}
  test('no more canvases', () => {
    const manifest = {
      slug: '/slug',
    }
    const wrapper = shallow(<ItemAlternateViews iiifManifest={manifest} viewer='mirador' location={location} />)

    expect(wrapper.find('div').exists()).toBeFalsy()
    expect(wrapper.find(AlternateImage).exists()).toBeFalsy()
  })

  test('some canvases', () => {
    const manifest = {
      slug: '/slug',
      items: [
        { id: 'a', slug: '/a' },
        { id: 'b', slug: '/b' },
        { id: 'c', slug: '/c' },
      ],
    }
    const wrapper = shallow(<ItemAlternateViews iiifManifest={manifest} viewer='mirador' location={location} />)

    expect(wrapper.find('div').exists()).toBeTruthy()
    expect(wrapper.find(AlternateImage).length).toEqual(2)
  })
})
