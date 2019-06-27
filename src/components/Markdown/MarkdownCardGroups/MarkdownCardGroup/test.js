import React from 'react'
import { shallow } from 'enzyme'
import MarkdownCardGroup from './'
import Card from 'components/Shared/Card'

test('MarkdownCardGroup', () => {
  const label = 'A group'
  const items = [
    { image: { publicURL: '/img.png' }, label: 'Label 1', target: '/target/1' },
    { image: { publicURL: '/img.jpg' }, label: 'Label 2', target: '/target/2' },
  ]
  const wrapper = shallow(<MarkdownCardGroup label={label} items={items} />)

  expect(wrapper.find('.featured').exists()).toBeTruthy()
  expect(wrapper.find('h2').text()).toEqual('A group')
  expect(wrapper.find(Card).length).toEqual(2)
  expect(wrapper.find(Card).at(0).props().target).toEqual('/target/1')
  expect(wrapper.find(Card).at(0).props().label).toEqual('Label 1')
  expect(wrapper.find(Card).at(0).props().image).toEqual('/img.png')
  expect(wrapper.find(Card).at(1).props().target).toEqual('/target/2')
  expect(wrapper.find(Card).at(1).props().label).toEqual('Label 2')
  expect(wrapper.find(Card).at(1).props().image).toEqual('/img.jpg')
})
