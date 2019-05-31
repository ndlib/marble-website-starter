import React from 'react'
import { shallow } from 'enzyme'
import Card from './'
import Image from 'components/Shared/Image'
import ExteralLinkIcon from './ExteralLinkIcon'

test('Card', () => {
  const props = {
    target: '/some-item',
    label: 'Card Label',
    image: 'img.png',
    children: <div className='childContent'>More Stuff</div>,
    location: {},
    cardClass: 'test-card',
  }
  const wrapper = shallow(<Card {...props} />)

  expect(wrapper.find('.test-card').props().to).toEqual('/some-item')
  expect(wrapper.find('article.cardWrapper').exists()).toBeTruthy()
  expect(wrapper.find('figure.cardFigure').exists()).toBeTruthy()
  expect(wrapper.find(Image).props().src).toEqual('img.png')
  expect(wrapper.find(ExteralLinkIcon).props().target).toEqual('/some-item')
  expect(wrapper.find('figcaption.cardCaption').exists()).toBeTruthy()
  expect(wrapper.find('h2').text()).toEqual('Card Label')
  expect(wrapper.find('.childContent').text()).toEqual('More Stuff')
})
