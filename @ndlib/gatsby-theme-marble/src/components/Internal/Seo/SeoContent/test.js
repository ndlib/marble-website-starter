import React from 'react'
import { shallow } from 'enzyme'
import { SeoContent } from './'
import GatsbySeoNext from './GatsbySeoNext'

const props = {
  title: 'A New Test Title',
  description: 'A different description',
  image: '/wubbzy.gif',
  lang: 'en-gb',
  pathname: '/some/page',
  siteUrl: 'https://example.test',
  siteTitle: 'Site Title',
  author: 'author',
  noIndex: false,
  noFollow: false,
}

describe('SeoContent', () => {
  test('All the props', () => {
    const wrapper = shallow(<SeoContent {...props} />)
    expect(wrapper.find(GatsbySeoNext).exists()).toBeTruthy()
    expect(wrapper.find(GatsbySeoNext).at(0).props().lang).toEqual('en-gb')
    expect(wrapper.find(GatsbySeoNext).at(0).props().title).toEqual('A New Test Title')
    expect(wrapper.find(GatsbySeoNext).at(0).props().image).toEqual('/wubbzy.gif')
    expect(wrapper.find(GatsbySeoNext).at(0).props().description).toEqual('A different description')
    expect(wrapper.find(GatsbySeoNext).at(0).props().pathname).toEqual('/some/page')
    expect(wrapper.find(GatsbySeoNext).at(0).props().base).toEqual('https://example.test')
    expect(wrapper.find(GatsbySeoNext).at(0).props().siteTitle).toEqual('Site Title')
    expect(wrapper.find(GatsbySeoNext).at(0).props().author).toEqual('author')
    expect(wrapper.find(GatsbySeoNext).at(0).props().noIndex).toEqual(false)
    expect(wrapper.find(GatsbySeoNext).at(0).props().noFollow).toEqual(false)
  })
})
