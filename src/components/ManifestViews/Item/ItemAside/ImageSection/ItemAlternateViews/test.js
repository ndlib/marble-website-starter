import React from 'react'
import { shallow } from 'enzyme'
import ItemAlternateViews from './'
import AlternateImage from './AlternateImage'

describe('ItemAlternateViews', () => {
  test('no more canvases', () => {
    const manifest = {}
    const wrapper = shallow(<ItemAlternateViews iiifManifest={manifest} />)

    expect(wrapper.find('div').exists()).toBeFalsy()
    expect(wrapper.find(AlternateImage).exists()).toBeFalsy()
  })

  test('some canvases', () => {
    const manifest = {
      sequences: [{
        canvases: ['a', 'b', 'c'],
      }],
    }
    const wrapper = shallow(<ItemAlternateViews iiifManifest={manifest} />)

    expect(wrapper.find('div').exists()).toBeTruthy()
    expect(wrapper.find(AlternateImage).length).toEqual(2)
  })
})
