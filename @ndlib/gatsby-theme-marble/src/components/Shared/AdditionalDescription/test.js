import React from 'react'
import { mount, shallow } from 'enzyme'
import AdditionalDescription from './'

describe('ManifestDescription', () => {
  console.error = jest.fn()
  test('with description', () => {
    const marbleItem = {
      additionalDescription: 'This is an additonal description on the item.',
    }
    const wrapper = mount(<AdditionalDescription marbleItem={marbleItem} />)
    expect(wrapper.find('ReactMarkdown').props().children).toEqual(marbleItem.additionalDescription)
  })
  test('without description', () => {
    const marbleItem = {}
    const wrapper = shallow(<AdditionalDescription marbleItem={marbleItem} />)
    expect(wrapper.find(AdditionalDescription).exists()).toBeFalsy()
  })
})
