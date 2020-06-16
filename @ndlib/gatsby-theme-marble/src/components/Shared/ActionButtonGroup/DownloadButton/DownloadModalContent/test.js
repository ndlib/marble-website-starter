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
  const ndJson = {}
  const wrapper = mount(<DownloadModalContent ndJson={ndJson} />)
  expect(wrapper.find(MultiColumn).props().columns).toEqual('2')
  expect(wrapper.find(Column).length).toEqual(2)
  expect(wrapper.find(DownloadImage).props().ndJson).toEqual(ndJson)
  expect(wrapper.find(DownloadMetadata).props().ndJson).toEqual(ndJson)
  expect(wrapper.find(Copyright).exists()).toBeTruthy()
})
