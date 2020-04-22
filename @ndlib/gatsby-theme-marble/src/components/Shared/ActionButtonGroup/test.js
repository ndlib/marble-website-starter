import React from 'react'
import { shallow } from 'enzyme'
import ActionButtonGroup, { printAction } from './'
import ActionButton from './ActionButton'
import BookmarkGroup from './BookmarkGroup'
import ActionModal from 'components/Internal/ActionModal'
import DownloadModalContent from './DownloadModalContent'
import ShareModalContent from './ShareModalContent'

const print = jest.fn()
const window = global.window || {}
Object.defineProperty(window, 'print', { value: print })

const manifest = {
  id: 'https://iiif.iiif',
  slug: 'item/3',
}
const wrapper = shallow(<ActionButtonGroup iiifManifest={manifest} />)
describe('ActionButtonGroup', () => {
  test('Renders 4 actions buttons and an wrapper', () => {
    expect(wrapper.find('actionButton')).toBeTruthy()
    expect(wrapper.find(BookmarkGroup).exists()).toBeTruthy()
    expect(wrapper.find(ActionButton).length).toEqual(3)
    expect(wrapper.find(ActionModal).length).toEqual(2)
    expect(wrapper.find(ShareModalContent).exists()).toBeTruthy()
    expect(wrapper.find(DownloadModalContent).exists()).toBeTruthy()
  })

  test('printAction', () => {
    printAction()
    expect(print).toHaveBeenCalled()
  })
})
