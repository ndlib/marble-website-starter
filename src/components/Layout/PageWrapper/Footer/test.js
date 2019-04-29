import React from 'react'
import { shallow } from 'enzyme'
import { Footer } from './'
import ReactMarkdown from 'react-markdown'
import Navigation from '../../../Shared/Navigation'

test('Footer renders some divs with markdown text', () => {
  const data = { site: { siteMetadata: {
    menus: { footer: [ 'links go here!' ] },
    footerText: 'footer!!'
  } } }
  const wrapper = shallow(<Footer data={data} />)

  expect(wrapper.find('footer.pageFooter').exists()).toBeTruthy()
  expect(wrapper.find('.footerInner').exists()).toBeTruthy()
  expect(wrapper.find('.footerText').exists()).toBeTruthy()
  expect(wrapper.find('.footerCenter').exists()).toBeTruthy()
  expect(wrapper.find('.footerLinks').exists()).toBeTruthy()
  expect(wrapper.find(ReactMarkdown).props().source).toEqual('footer!!')
  expect(wrapper.find(Navigation).props().links).toEqual([ 'links go here!' ])
})
