import React from 'react'
import { shallow } from 'enzyme'
import Item from './'
import Layout from 'components/Layout'
import MetaDataList from 'components/Shared/MetaDataList'

const manifest = {
  label: 'fancy label',
  description: 'some text',
  metadata: [{ some: 'metadata' }],
  attribution: 'some guy',
  license: `<a href='/link'>Copyright</a>`,
}
const location = {}

const wrapper = shallow(<Item iiifManifest={manifest} location={location} />)

test('Item', () => {
  expect(wrapper.find(Layout).props().title).toEqual('fancy label')
  expect(wrapper.find('.description').text()).toEqual('some text')
  expect(wrapper.find(MetaDataList).props().metadata).toEqual([{ some: 'metadata' }])
  expect(wrapper.find('.attribution').text()).toEqual('some guy')
  expect(wrapper.find('.license').html()).toContain(`<a href='/link'>Copyright</a>`)
})
