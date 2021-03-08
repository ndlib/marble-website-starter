import React from 'react'
import { mount } from 'enzyme'
import CardWrapper from './'
import Link from 'components/Shared/Link'

describe('CardWrapper', () => {
  console.error = jest.fn()
  const card = <div className='iAmCard' />

  test('target -> wrap with Link', () => {
    const wrapper = mount(<CardWrapper target='/some/path'>{card}</CardWrapper>)
    expect(wrapper.find(Link).props().to).toEqual('/some/path')
    expect(wrapper.find('.iAmCard').exists()).toBeTruthy()
  })
  test('onClick -> wrap with button', () => {
    const wrapper = mount(<CardWrapper onClick={() => jest.fn()}>{card}</CardWrapper>)
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.find('.iAmCard').exists()).toBeTruthy()
  })
  test('do not wrap', () => {
    const wrapper = mount(<CardWrapper>{card}</CardWrapper>)
    expect(wrapper.find('button').exists()).toBeFalsy()
    expect(wrapper.find(Link).exists()).toBeFalsy()
    expect(wrapper.find('.iAmCard').exists()).toBeTruthy()
  })
})
