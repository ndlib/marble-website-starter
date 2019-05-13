import React from 'react'
import { shallow } from 'enzyme'
import CollectionAside from './'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import MetaDataList from 'components/Shared/MetaDataList'

const manifest = {
  id: 'id',
  description: 'some text',
  metadata: [{ meta: 'list' }],
}

test('CollectionAside', () => {
  const wrapper = shallow(<CollectionAside iiifManifest={manifest} />)

  expect(wrapper.find(ActionButtonGroup).props().iiifManifest).toEqual(manifest)
  expect(wrapper.find('p').text()).toEqual('some text')
  expect(wrapper.find(MetaDataList).props().metadata).toEqual([{ meta: 'list' }])
})
