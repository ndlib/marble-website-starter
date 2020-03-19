import React from 'react'
import { shallow } from 'enzyme'
import CardGroup from './'

test('CardGroup', () => {
  const children = [
    <div key='a'>Card 1</div>,
    <div key='b'>Card 2</div>,
    <div key='c'>Card 3</div>,
  ]
  const label = 'A Card Group'

  const wrapper = shallow(<CardGroup label={label}>{children}</CardGroup>)
  expect(wrapper.find('.cardGroup').exists()).toBeTruthy()
  expect(wrapper.find('ForwardRef').text()).toEqual('A Card Group')
  expect(wrapper.find('.cardWrapper').length).toEqual(3)
})
