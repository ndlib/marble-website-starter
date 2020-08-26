import React from 'react'
import { mount } from 'enzyme'
import { BaseStyles, Styled } from 'theme-ui'
import Card from './'
import CardWrapper from './CardWrapper'
import Image from 'components/Shared/Image'
import ExternalLinkIcon from './ExternalLinkIcon'

console.error = jest.fn()
test('Card', () => {
  const props = {
    target: '/some-item',
    label: 'Card Label',
    image: 'img.png',
    children: <div className='childContent'>More Stuff</div>,
    location: {},
  }
  const wrapper = mount(<Card {...props} />)
  expect(wrapper.find(CardWrapper).exists()).toBeTruthy()
  expect(wrapper.find(BaseStyles).exists()).toBeTruthy()
  expect(wrapper.find('article').exists()).toBeTruthy()
  expect(wrapper.find('figure').exists()).toBeTruthy()
  expect(wrapper.find(Image).props().src).toEqual('img.png')
  expect(wrapper.find(ExternalLinkIcon).props().target).toEqual('/some-item')
  expect(wrapper.find('figcaption').exists()).toBeTruthy()
  expect(wrapper.find('h2').text()).toEqual('Card Label')
  expect(wrapper.find('.childContent').text()).toEqual('More Stuff')
})
