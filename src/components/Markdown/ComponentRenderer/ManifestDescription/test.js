import React from 'react'
import { shallow } from 'enzyme'
import ManifestDescription from './'
import MarkdownHtmlContent from '../MarkdownHtmlContent'

describe('ManifestDescription', () => {
  test('with description', () => {
    const iiifManifest = {
      description: 'This is the description of the manifest.',
    }
    const wrapper = shallow(<ManifestDescription iiifManifest={iiifManifest} />)
    expect(wrapper.find(MarkdownHtmlContent).props().html).toEqual(iiifManifest.description)
  })
  test('without description', () => {
    const iiifManifest = {}
    const wrapper = shallow(<ManifestDescription iiifManifest={iiifManifest} />)
    expect(wrapper.find(MarkdownHtmlContent).props().html).toEqual(null)
  })
})
