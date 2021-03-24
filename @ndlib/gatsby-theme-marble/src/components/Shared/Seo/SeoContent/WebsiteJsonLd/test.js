import React from 'react'
import { shallow } from 'enzyme'
import WebsiteJsonLd from './'
import { JsonLd } from 'gatsby-plugin-next-seo'

test('Website JSON LD schema on homepage', () => {
  const wrapper = shallow(<WebsiteJsonLd pathname='/' siteUrl='https://marble.nd.edu' />)
  console.log(wrapper.debug())
  expect(wrapper.find(JsonLd).props().url).toEqual('https://marble.nd.edu')
})
