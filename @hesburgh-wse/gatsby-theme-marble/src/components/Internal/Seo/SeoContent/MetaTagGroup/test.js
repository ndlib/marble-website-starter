import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
import MetaTagGroup from './'

test('MetaTagGroup', () => {
  const tags = [
    { property: 'og:title', content: 'My OpenGraph Title' },
    { name: 'twitter:card', content: 'My Twitter Card Summary' },
    { a: 'b', c: 'd', e: 'f', g: 'h' },
  ]
  const wrapper = shallow(<MetaTagGroup tags={tags} />)

  expect(wrapper.find(Helmet).exists()).toBeTruthy()
  // some realistic data
  expect(wrapper.find('meta').at(0).props().property).toEqual('og:title')
  expect(wrapper.find('meta').at(0).props().content).toEqual('My OpenGraph Title')
  expect(wrapper.find('meta').at(1).props().name).toEqual('twitter:card')
  expect(wrapper.find('meta').at(1).props().content).toEqual('My Twitter Card Summary')

  // lots of tag properties
  expect(wrapper.find('meta').at(2).props().a).toEqual('b')
  expect(wrapper.find('meta').at(2).props().c).toEqual('d')
  expect(wrapper.find('meta').at(2).props().e).toEqual('f')
  expect(wrapper.find('meta').at(2).props().g).toEqual('h')
})
