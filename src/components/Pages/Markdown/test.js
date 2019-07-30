import React from 'react'
import { shallow } from 'enzyme'
import Markdown from './'
import MarkdownSeo from './MarkdownSeo'
import MarkdownLayoutRenderer from '../../../../plugins/gatsby-remark-react-components'

test('Markdown', () => {
  const data = {
    markdownRemark: {
      frontmatter: {
        title: 'A title',
      },
    } }
  const location = { some: 'place' }
  const wrapper = shallow(<Markdown data={data} location={location} />)
  expect(wrapper.find(MarkdownSeo).exists()).toBeTruthy()
  expect(wrapper.find(MarkdownLayoutRenderer).exists()).toBeTruthy()
})
