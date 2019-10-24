import React from 'react'
import { shallow } from 'enzyme'
import ComponentRenderer from './'
import TestComponent from './TestComponent'
import MarkdownHtmlContent from './MarkdownHtmlContent'

describe('ComponentRenderer', () => {
  test('MarkdownHtmlContent', () => {
    const props = {
      availableComponents: {},
      component: 'MarkdownHtmlContent',
      html: '<b>Some Html Content</b>',
    }
    const wrapper = shallow(<ComponentRenderer {...props} />)
    expect(wrapper.find(MarkdownHtmlContent).props().html).toContain('<b>Some Html Content</b>')
  })

  test('Fall back to TestComponent', () => {
    const props = {
      availableComponents: {},
      component: 'FakeComponent',
    }
    const wrapper = shallow(<ComponentRenderer {...props} />)
    expect(wrapper.find(TestComponent).exists()).toBeTruthy()
  })

  test('Custom Component', () => {
    const NewComponent = () => {
      return (<div>New Component</div>)
    }
    const props = {
      availableComponents: { NewComponent: NewComponent },
      component: 'NewComponent',
    }
    const wrapper = shallow(<ComponentRenderer {...props} />)
    expect(wrapper.find(NewComponent).exists()).toBeTruthy()
  })
})
