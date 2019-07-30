import React from 'react'
import { shallow } from 'enzyme'
import ManifestLink from './'
import imgIIIF from './iiif.png'
import Link from 'components/Internal/Link'

const url = 'http://test.manifest'
const wrapper = shallow(<ManifestLink manifestUrl={url} />)

test('Link to manifest with icon', () => {
  expect(wrapper.find(Link).props().to).toEqual(url)
  expect(wrapper.find(Link).props().target).toEqual('_blank')
  expect(wrapper.find('img').props().src).toEqual(imgIIIF)
})
