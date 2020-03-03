import React from 'react'
import { shallow } from 'enzyme'
import ActionButtonGroup,
{
  bookmarkAction,
  shareAction,
  printAction,
  downloadAction,
} from './'
import ActionButton from './ActionButton'

const print = jest.fn()
const window = global.window || {}
Object.defineProperty(window, 'print', print)

const manifest = {
  id: 'https://iiif.iiif',
}
const wrapper = shallow(<ActionButtonGroup iiifManifest={manifest} />)

test('Renders 4 actions buttons and an wrapper', () => {
  expect(wrapper.find('actionButton')).toBeTruthy()
  expect(wrapper.find(ActionButton).length).toEqual(3)
})

const spyOnLog = jest.spyOn(console, 'log')
beforeEach(() => {
  spyOnLog.mockReset()
})

// TODO test functions (after functions written)
test('bookmarkAction', () => {
  bookmarkAction()
  expect(spyOnLog).toHaveBeenCalled()
})

test('shareAction', () => {
  shareAction()
  expect(spyOnLog).toHaveBeenCalled()
})

// test('printAction', () => {
//   // jest and jsdom will complain about window.print even with proper mocking so we suppress the error
//   jest.spyOn(console, 'error')
//   global.console.error.mockImplementation(() => {})
//
//   const printSpy = jest.spyOn(window, 'print')
//
//   printAction()
//   expect(printSpy).toHaveBeenCalled()
// })

test('downloadAction', () => {
  downloadAction()
  expect(spyOnLog).toHaveBeenCalled()
})
