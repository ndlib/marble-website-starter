import React from 'react'
import { shallow } from 'enzyme'
import ItemAlternateViews from './'
import AlternateImage from './AlternateImage'

describe('ItemAlternateViews', () => {
  const location = {}
  test('no more canvases', () => {
    const marbleItem = {
      id: 'a',
    }
    const wrapper = shallow(<ItemAlternateViews marbleItem={marbleItem} viewer='mirador' location={location} />)

    expect(wrapper.find('div').exists()).toBeFalsy()
    expect(wrapper.find(AlternateImage).exists()).toBeFalsy()
  })

  test('some canvases', () => {
    const marbleItem = {
      id: 'a',
      allImages: [
        { service: '/a' },
        { servicei: '/b' },
        { service: '/c' },
      ],
    }
    const wrapper = shallow(<ItemAlternateViews marbleItem={marbleItem} viewer='mirador' location={location} />)

    expect(wrapper.find('div').exists()).toBeTruthy()
    expect(wrapper.find(AlternateImage).length).toEqual(2)
  })
})
