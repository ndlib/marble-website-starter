import React from 'react'
import { shallow } from 'enzyme'
import ManifestDescription from './'

describe('ManifestDescription', () => {
  console.error = jest.fn()
  test('with description', () => {
    const marbleItem = {
      description: 'This is the description of the manifest.',
    }
    const wrapper = shallow(<ManifestDescription marbleItem={marbleItem} />)
    expect(wrapper.html()).toEqual('<div class="descriptionBlock"><p>' + marbleItem.description + '</p></div>')
  })
  test('without description', () => {
    const marbleItem = {}
    const wrapper = shallow(<ManifestDescription marbleItem={marbleItem} />)
    expect(wrapper.find(ManifestDescription).exists()).toBeFalsy()
  })
})
