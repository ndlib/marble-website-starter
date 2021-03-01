import React from 'react'
import { shallow } from 'enzyme'
import { SeoContent } from './'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

describe('SeoContent', () => {
  const props = {
    title: 'A New Test Title',
    url: 'https://example.test/some/page',
    description: 'A different description',
    image: '/wubbzy.gif',
    lang: 'en-gb',
    pathname: '/some/page',
    siteUrl: 'https://example.test',
    siteTitle: 'Site Title',
    author: 'author name',
    noIndex: false,
    noFollow: false,
  }
  const wrapper = shallow(<SeoContent {...props} />)

  test('page metadata props', () => {
    expect(wrapper.find(GatsbySeo).exists()).toBeTruthy()
    expect(wrapper.find(GatsbySeo).at(0).props().language).toEqual('en-gb')
    expect(wrapper.find(GatsbySeo).at(0).props().canonical).toEqual('https://example.test/some/page')
    expect(wrapper.find(GatsbySeo).at(0).props().title).toEqual('A New Test Title')
    expect(wrapper.find(GatsbySeo).at(0).props().description).toEqual('A different description')
    expect(wrapper.find(GatsbySeo).at(0).props().noindex).toEqual(false)
    expect(wrapper.find(GatsbySeo).at(0).props().nofollow).toEqual(false)
  })
  test('openGraph props', () => {
    expect(wrapper.find(GatsbySeo).at(0).props().openGraph.description).toEqual('A different description')
    expect(wrapper.find(GatsbySeo).at(0).props().openGraph.images[0].alt).toEqual('A different description')
    expect(wrapper.find(GatsbySeo).at(0).props().openGraph.images[0].url).toEqual('/wubbzy.gif')
    expect(wrapper.find(GatsbySeo).at(0).props().openGraph.title).toEqual('A New Test Title')
    expect(wrapper.find(GatsbySeo).at(0).props().openGraph.site_name).toEqual('Site Title')
    expect(wrapper.find(GatsbySeo).at(0).props().openGraph.url).toEqual('https://example.test/some/page')
  })
  test('twitter props', () => {
    expect(wrapper.find(GatsbySeo).at(0).props().twitter.handle).toEqual('author name')
  })
})
