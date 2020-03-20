import React from 'react'
import { mount } from 'enzyme'
import HorizontalRule from './'

console.error = jest.fn()

describe('HorizontalRule', () => {
  test('renders <hr /> and <svg />', () => {
    const wrapper = mount(
      <HorizontalRule />,
    )
    expect(wrapper.find('hr').exists()).toBeTruthy()
    expect(wrapper.find('svg').exists()).toBeTruthy()
  })
})
