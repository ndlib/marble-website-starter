import React from 'react'
import { shallow } from 'enzyme'
import ManifestDescription from './'
import MarkdownHtmlContent from '../../../../plugins/gatsby-remark-react-components/MarkdownLayoutRenderer/ComponentRenderer/MarkdownHtmlContent/'

describe('ManifestDescription', () => {
  console.error = jest.fn()
  test('with description', () => {
    const iiifManifest = {
      summary: {
        none: [ 'This is the description of the manifest.' ],
      },
    }
    const wrapper = shallow(<ManifestDescription iiifManifest={iiifManifest} />)
    expect(wrapper.find(MarkdownHtmlContent).props().html).toEqual(iiifManifest.summary.none[0])
  })
  test('without description', () => {
    const iiifManifest = {}
    const wrapper = shallow(<ManifestDescription iiifManifest={iiifManifest} />)
    expect(wrapper.find(MarkdownHtmlContent).exists()).toBeFalsy()
  })
})
