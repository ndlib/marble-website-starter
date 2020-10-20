import React from 'react'
import { shallow } from 'enzyme'
import ManifestCard from './'
import ManifestCardChildren from './ManifestCardChildren'
import TypeLabel from './TypeLabel'
import Card from 'components/Shared/Card'

describe('ManifestCard', () => {
  test('found', () => {
    const props = {
      label: 'label',
      target: '/slug-1',
      image: 'my-image.jpg',
      creator: ['creator'],
      date: ['date'],
      type: 'thing',
    }
    const wrapper = shallow(<ManifestCard {...props} />)
    expect(wrapper.find(Card).props().label).toEqual('label')
    expect(wrapper.find(Card).props().target).toEqual('/slug-1')
    expect(wrapper.find(Card).props().image).toEqual('my-image.jpg')
    expect(wrapper.find(ManifestCardChildren).props().date).toEqual(['date'])
    expect(wrapper.find(ManifestCardChildren).props().creator).toEqual(['creator'])
    expect(wrapper.find(TypeLabel).props().type).toEqual('thing')
  })
})
