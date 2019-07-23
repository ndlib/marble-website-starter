import React from 'react'
import { shallow } from 'enzyme'
import MarkdownHtmlContent from './'

describe('MarkdownHtmlContent', () => {
  test('with content', () => {
    const html = '<b>Hello World!</b>'
    const wrapper = shallow(<MarkdownHtmlContent html={html} />)
    expect(wrapper.find('.htmlContent').html()).toContain('<b>Hello World!</b>')
  })
  test('without content', () => {
    const html = null
    const wrapper = shallow(<MarkdownHtmlContent html={html} />)
    expect(wrapper.find('.htmlContent').exists()).toBeFalsy()
  })
})
