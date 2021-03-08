import React from 'react'
import { shallow } from 'enzyme'
import ActionButtonGroup from './'
import BookmarkGroup from './BookmarkGroup'
import ShareButton from 'components/Shared/ShareButton'
import PrintButton from 'components/Shared/PrintButton'
import DownloadButton from './DownloadButton'

const marbleItem = {
  id: '123',
  slug: 'slug/123',
}
const wrapper = shallow(<ActionButtonGroup marbleItem={marbleItem} />)
describe('ActionButtonGroup', () => {
  test('Renders', () => {
    expect(wrapper.find('actionButton')).toBeTruthy()
    expect(wrapper.find(BookmarkGroup).exists()).toBeTruthy()
    expect(wrapper.find(DownloadButton).exists()).toBeTruthy()
    expect(wrapper.find(ShareButton).props().path).toEqual(marbleItem.slug)
    expect(wrapper.find(PrintButton).exists()).toBeTruthy()
  })
})
