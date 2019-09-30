import React from 'react'
import { shallow } from 'enzyme'
import ActionButton from './'

const fakeIcon = 'SVG MARKUP HERE'
const fakeActiveIcon = 'DIFFERENT SVG MARKUP HERE'
const action = jest.fn()
const wrapper = shallow(
  <ActionButton
    name='test'
    action={action}
    icon={fakeIcon}
  />
)
describe('ActionButton', () => {
  test('render the button and icon', () => {
    expect(wrapper.find('button')).toBeTruthy()
    expect(wrapper.find('.actionButton.test')).toBeTruthy()
    expect(wrapper.find('img').prop('src')).toEqual('SVG MARKUP HERE')
  })

  test('simulate click event', () => {
    wrapper.find('button').simulate('click')
    expect(action).toHaveBeenCalled()
  })

  test('test of isActive', () => {
    const wrapper = shallow(
      <ActionButton
        name='test'
        action={action}
        icon={fakeIcon}
        activeIcon={fakeActiveIcon}
        isActive
      />
    )
    expect(wrapper.find('img').prop('src')).toEqual('DIFFERENT SVG MARKUP HERE')
  })
})
