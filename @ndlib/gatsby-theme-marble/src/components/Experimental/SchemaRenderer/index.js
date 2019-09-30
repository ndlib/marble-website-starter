import React from 'react'
import PropTypes from 'prop-types'
import TitleMicro from './TitleMicro'
import DateMicro from './DateMicro'
import Default from './Default'
import LinkMicro from './LinkMicro'

const SchemaRenderer = ({ schema, renderer }) => {
  const metaObj = []

  renderer.sections[0].attributes.forEach(
    field => {
      if (schema[field.key]) {
        const props = {
          meta: field,
          schema: schema,
          key: field.key,
        }
        const component = getComponentForRenderer(field.renderer)
        metaObj.push(React.createElement(component, props, null))
      }
    }
  )
  return (
    <dl>{metaObj}</dl>
  )
}

SchemaRenderer.propTypes = {
  schema: PropTypes.object.isRequired,
  renderer: PropTypes.object.isRequired,
}

export default SchemaRenderer

// Helper function to determine which react component to use for rendering
export const getComponentForRenderer = (renderer) => {
  switch (renderer) {
    case 'title':
      return TitleMicro
    case 'date':
      return DateMicro
    case 'link':
      return LinkMicro
    case 'basic':
    default:
      return Default
  }
}
