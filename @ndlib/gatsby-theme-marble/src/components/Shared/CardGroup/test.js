import React from 'react'
import { mount } from 'enzyme'
import CardGroup from './'

test('CardGroup', () => {
  const children = [
    <div key='a'>Card 1</div>,
    <div key='b'>Card 2</div>,
    <div key='c'>Card 3</div>,
  ]
  const label = 'A Card Group'

  const wrapper = mount(<CardGroup label={label}>{children}</CardGroup>)
  expect(wrapper.find('.cardGroup').exists()).toBeTruthy()
  expect(wrapper.find('h2').text()).toEqual('A Card Group')
  expect(wrapper.findWhere(c => {
    return c.text() === 'Card 1'
  }).exists()).toBeTruthy()
  expect(wrapper.findWhere(c => {
    return c.text() === 'Card 2'
  }).exists()).toBeTruthy()
  expect(wrapper.findWhere(c => {
    return c.text() === 'Card 3'
  }).exists()).toBeTruthy()
})
