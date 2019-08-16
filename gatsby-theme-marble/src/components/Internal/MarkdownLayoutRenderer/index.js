import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import ComponentRenderer from './ComponentRenderer'

export const MarkdownLayoutRenderer = ({ markdownRemark, availableComponents, globalProps }) => {
  const layoutComponents = typy(markdownRemark, 'fields.components').safeObject
  return (
    <React.Fragment>
      {
        layoutComponents.map((comp, index) => {
          return expandChildren(availableComponents, comp, globalProps, index)
        })
      }
    </React.Fragment>
  )
}

MarkdownLayoutRenderer.propTypes = {
  availableComponents: PropTypes.object.isRequired,
  globalProps: PropTypes.object.isRequired,
  markdownRemark: PropTypes.object.isRequired,
}

MarkdownLayoutRenderer.defaultProps = {
  availableComponents: {},
  globalProps: {},
}
export default MarkdownLayoutRenderer

export const expandChildren = (availableComponents, row, globalProps, key = 0) => {
  const children = row.components

  if (children) {
    const childComponents = []
    children.forEach((child, i) => {
      childComponents.push(expandChildren(availableComponents, child, globalProps, i))
    })
    return (
      <ComponentRenderer
        availableComponents={availableComponents}
        component={row.component}
        children={childComponents}
        key={`${row.component}-${key}`}
        {...transformProps(globalProps, row.props)}
      />
    )
  }

  return (
    <ComponentRenderer
      availableComponents={availableComponents}
      component={row.component}
      key={`${row.component}-${key}`}
      {...transformProps(globalProps, row.props)}
    />
  )
}

export const transformProps = (globalProps, propObjectArr) => {
  const props = Object.assign({}, globalProps)
  typy(propObjectArr).safeArray.forEach(propObject => {
    props[propObject.label] = propObject.value || propObject.fileValue.publicURL
  })
  return props
}
