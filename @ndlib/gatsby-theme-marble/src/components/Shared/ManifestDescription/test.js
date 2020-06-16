import React from 'react'
import { shallow } from 'enzyme'
import ManifestDescription from './'

describe('ManifestDescription', () => {
  console.error = jest.fn()
  test('with description', () => {
    const ndJson = {
      description: 'This is the description of the manifest.',
    }
    const wrapper = shallow(<ManifestDescription ndJson={ndJson} />)
    expect(wrapper.html()).toEqual('<div class="descriptionBlock"><p>' + ndJson.description + '</p></div>')
  })
  test('without description', () => {
    const ndJson = {}
    const wrapper = shallow(<ManifestDescription ndJson={ndJson} />)
    expect(wrapper.find(ManifestDescription).exists()).toBeFalsy()
  })
})
