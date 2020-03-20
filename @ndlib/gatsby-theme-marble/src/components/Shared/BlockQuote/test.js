import React from 'react'
import { mount } from 'enzyme'
import BlockQuote from './'
import HorizontalRule from 'components/Shared/HorizontalRule'

console.error = jest.fn()

describe('HorizontalRule', () => {
  test('renders <blockquote /> and two HorizontalRule components', () => {
    const wrapper = mount(
      <BlockQuote />,
    )
    expect(wrapper.find('blockquote').exists()).toBeTruthy()
    expect(wrapper.find(HorizontalRule).length).toEqual(2)
  })
})
