import React from 'react'
import { shallow } from 'enzyme'
import ManifestDescription from './'
import MarkdownHtmlContent from 'components/Internal/MarkdownLayoutRenderer/ComponentRenderer/MarkdownHtmlContent/'

describe('ManifestDescription', () => {
  console.error = jest.fn()
  test('with description', () => {
    const iiifManifest = {
      summary: {
        none: ['This is the description of the manifest.'],
      },
    }
    const wrapper = shallow(<ManifestDescription iiifManifest={iiifManifest} />)
    expect(wrapper.html()).toEqual('<div class="descriptionBlock"><p>' + iiifManifest.summary.none[0] + '</p></div>')
  })
  test('without description', () => {
    const iiifManifest = {}
    const wrapper = shallow(<ManifestDescription iiifManifest={iiifManifest} />)
    expect(wrapper.find(ManifestDescription).exists()).toBeFalsy()
  })
})
