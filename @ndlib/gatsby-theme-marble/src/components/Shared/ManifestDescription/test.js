import React from 'react'
import { mount, shallow } from 'enzyme'
import ManifestDescription from './'

describe('ManifestDescription', () => {
  console.error = jest.fn()
  test('with description', () => {
    const marbleItem = {
      description: 'This is the description of the manifest.',
    }
    const wrapper = mount(<ManifestDescription marbleItem={marbleItem} />)
    expect(wrapper.find('ReactMarkdown').props().source).toEqual(marbleItem.description)
  })
  test('without description', () => {
    const marbleItem = {}
    const wrapper = shallow(<ManifestDescription marbleItem={marbleItem} />)
    expect(wrapper.find(ManifestDescription).exists()).toBeFalsy()
  })
})
