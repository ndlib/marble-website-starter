import React from 'react'
import PropTypes from 'prop-types'

const Default = ({ meta, schema }) => {
  return (
    <React.Fragment>
      <dt>{meta.label}:</dt>
      <dd> {schema[meta.key]} </dd>
    </React.Fragment>
  )
}

export default Default

Default.propTypes = {
  meta: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}
