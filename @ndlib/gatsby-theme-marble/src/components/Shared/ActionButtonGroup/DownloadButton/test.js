import React from 'react'
import { shallow } from 'enzyme'
import DownloadButton from './'
import ActionButton from 'components/Shared/ActionButtonGroup/ActionButton'
import ActionModal from 'components/Shared/ActionModal'
import DownloadModalContent from './DownloadModalContent'
import downloadImg from 'assets/icons/svg/baseline-share-24px.svg'

test('DownloadButton', () => {
  const marbleItem = { id: 'test' }
  const wrapper = shallow(<DownloadButton marbleItem={marbleItem} />)
  expect(wrapper.find(ActionButton).props().icon).toEqual(downloadImg)
  expect(wrapper.find(ActionButton).props().name).toEqual('Download')
  expect(wrapper.find(ActionModal).props().contentLabel).toEqual('Download')
  expect(wrapper.find(DownloadModalContent).props().marbleItem).toEqual(marbleItem)
})
