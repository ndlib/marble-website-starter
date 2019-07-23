import React from 'react'
import { mount } from 'enzyme'
import MarkdownLayoutRenderer from './'
import ComponentRenderer from './ComponentRenderer'
import TestComponent from './ComponentRenderer/TestComponent'
import MarkdownHtmlContent from './ComponentRenderer/MarkdownHtmlContent'

test('MarkdownLayoutRenderer', () => {
  const markdownRemark = {
    fields: {
      components: [
        {
          component: 'MarkdownHtmlContent',
          props: {
            label: 'html',
            value: 'Test Content',
          },
        },
        {
          component: 'Fake1',
          components: [{
            component: 'Fake2',
            components: [{
              component: 'Fake3',
            }],
          }],
        },
      ],
    },
  }
  const availableComponents = {}
  const globalProps = {}

  const wrapper = mount(<MarkdownLayoutRenderer markdownRemark={markdownRemark} availableComponents={availableComponents} globalProps={globalProps} />)
  expect(wrapper.find(MarkdownHtmlContent).props().html).toEqual('Test Content')
  expect(wrapper.find(TestComponent).length).toEqual(3)
  expect(wrapper.find(ComponentRenderer).length).toEqual(4)
})
