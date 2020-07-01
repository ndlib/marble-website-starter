import React from 'react'
import { mount } from 'enzyme'
import DownloadModalContent from './'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import DownloadImage from './DownloadImage'
import DownloadMetadata from './DownloadMetadata'
// import DownloadCitation from './DownloadCitation'
import Copyright from './Copyright'

test('DownloadModalContent', () => {
  const marbleItem = {}
  const wrapper = mount(<DownloadModalContent marbleItem={marbleItem} />)
  expect(wrapper.find(MultiColumn).props().columns).toEqual('2')
  expect(wrapper.find(Column).length).toEqual(2)
  expect(wrapper.find(DownloadImage).props().marbleItem).toEqual(marbleItem)
  expect(wrapper.find(DownloadMetadata).props().marbleItem).toEqual(marbleItem)
  // expect(wrapper.find(DownloadCitation).props().ndJson).toEqual(ndJson)
  expect(wrapper.find(Copyright).exists()).toBeTruthy()
})
