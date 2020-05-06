import React from 'react'
import { shallow } from 'enzyme'
import PrintButton, { printAction } from './'
import ActionButton from 'components/Shared/ActionButtonGroup/ActionButton'
import printImg from 'assets/icons/svg/baseline-print-24px.svg'

const print = jest.fn()
const window = global.window || {}
Object.defineProperty(window, 'print', { value: print })

const wrapper = shallow(<PrintButton />)
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
