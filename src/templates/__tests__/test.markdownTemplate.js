import React from 'react'
import { shallow } from 'enzyme'
import { MarkdownTemplate } from '../markdownTemplate'
import Markdown from 'components/Markdown'

test('it renders the manifest template', () => {
  const data = {
    some: 'data',
  }
  const location = {
    some: 'location',
  }
  const wrapper = shallow(<MarkdownTemplate data={data} location={location} />)
  expect(wrapper.find(Markdown).exists()).toBeTruthy()
  expect(wrapper.find(Markdown).prop('data')).toEqual({ some: 'data' })
  expect(wrapper.find(Markdown).prop('location')).toEqual({ some: 'location' })
})
