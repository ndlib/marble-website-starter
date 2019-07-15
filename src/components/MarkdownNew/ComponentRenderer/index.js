import React from 'react'
import PropTypes from 'prop-types'

import TestComponent from './TestComponent'
import CardGroup from './CardGroup'
import Card from 'components/Shared/Card'

const ComponentRenderer = (props) => {
  console.log(props)
  switch (props.component) {
    case 'CardGroup':
      return <CardGroup {...props} />
    case 'Card':
      return <Card {...props} />
    default:
      return <TestComponent {...props} />
  }
}

ComponentRenderer.propTypes = {
  component: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default ComponentRenderer
