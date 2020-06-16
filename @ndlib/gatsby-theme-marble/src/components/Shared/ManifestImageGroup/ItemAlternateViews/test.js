import React from 'react'
import { shallow } from 'enzyme'
import ItemAlternateViews from './'
import AlternateImage from './AlternateImage'

describe('ItemAlternateViews', () => {
  const location = {}
  test('no more canvases', () => {
    const ndJson = {
      id: 'a',
    }
    const wrapper = shallow(<ItemAlternateViews ndJson={ndJson} viewer='mirador' location={location} />)

    expect(wrapper.find('div').exists()).toBeFalsy()
    expect(wrapper.find(AlternateImage).exists()).toBeFalsy()
  })

  test('some canvases', () => {
    const ndJson = {
      id: 'a',
      items: [
        { id: 'a', iiifUri: '/a' },
        { id: 'b', iiifUri: '/b' },
        { id: 'c', iiifUri: '/c' },
      ],
    }
    const wrapper = shallow(<ItemAlternateViews ndJson={ndJson} viewer='mirador' location={location} />)

    expect(wrapper.find('div').exists()).toBeTruthy()
    expect(wrapper.find(AlternateImage).length).toEqual(2)
  })
})
