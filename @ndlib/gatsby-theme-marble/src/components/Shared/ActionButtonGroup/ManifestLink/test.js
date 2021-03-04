import React from 'react'
import { shallow } from 'enzyme'
import ManifestLink from './'
import imgIIIF from './iiif.png'
console.error = jest.fn()
const url = 'http://test.manifest'

test('Link to manifest with icon', () => {
  const wrapper = shallow(<ManifestLink manifestUrl={url} />)
  expect(wrapper.find('EmotionCssPropShared').at(1).props().to).toEqual(url)
  expect(wrapper.find('EmotionCssPropShared').at(1).props().target).toEqual('_blank')
  expect(wrapper.find('EmotionCssPropShared').at(1).prop('aria-label')).toEqual('Download IIIF manifest.')
  expect(wrapper.find('EmotionCssPropShared').at(2).props().src).toEqual(imgIIIF)
})
