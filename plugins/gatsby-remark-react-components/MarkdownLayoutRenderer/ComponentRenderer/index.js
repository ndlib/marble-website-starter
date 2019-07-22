import React from 'react'
import PropTypes from 'prop-types'

import TestComponent from './TestComponent'
import MarkdownHtmlContent from './MarkdownHtmlContent'

const ComponentRenderer = (props) => {
  const validComponents = Object.assign({}, props.availableComponents)
  validComponents['MarkdownHtmlContent'] = MarkdownHtmlContent
  const renderComponent = validComponents[props.component] || TestComponent
  const rawProps = Object.assign({}, props)
  delete rawProps.availableComponents
  return React.createElement(renderComponent, rawProps, props.children)
}

ComponentRenderer.propTypes = {
  availableComponents: PropTypes.object.isRequired,
  component: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default ComponentRenderer
