import React from 'react'
import { shallow } from 'enzyme'
import PrintButton, { printAction } from './'
import ActionButton from 'components/Shared/ActionButtonGroup/ActionButton'
import printImg from 'assets/icons/svg/baseline-print-24px.svg'

const print = jest.fn()
const window = global.window || {}
Object.defineProperty(window, 'print', { value: print })

const manifest = {
  id: 'https://iiif.iiif',
  slug: 'item/3',
}
const wrapper = shallow(<PrintButton iiifManifest={manifest} />)
describe('PrintButton', () => {
  test('renders', () => {
    expect(wrapper.find(ActionButton).props().icon).toEqual(printImg)
    expect(wrapper.find(ActionButton).props().name).toEqual('Print')
  })
  test('printAction', () => {
    printAction()
    expect(print).toHaveBeenCalled()
  })
})
