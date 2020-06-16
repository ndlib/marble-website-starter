import React from 'react'
import { shallow } from 'enzyme'
import ActionButtonGroup from './'
import BookmarkGroup from './BookmarkGroup'
import ShareButton from 'components/Internal/ShareButton'
import PrintButton from 'components/Internal/PrintButton'
import DownloadButton from './DownloadButton'

const ndJson = {
  id: '123',
}
const wrapper = shallow(<ActionButtonGroup ndJson={ndJson} />)
describe('ActionButtonGroup', () => {
  test('Renders', () => {
    expect(wrapper.find('actionButton')).toBeTruthy()
    expect(wrapper.find(BookmarkGroup).exists()).toBeTruthy()
    expect(wrapper.find(DownloadButton).exists()).toBeTruthy()
    expect(wrapper.find(ShareButton).exists()).toBeTruthy()
    expect(wrapper.find(PrintButton).exists()).toBeTruthy()
  })
})
