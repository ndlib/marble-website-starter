import React from 'react'
import PropTypes from 'prop-types'

const Default = ({ meta, schema }) => {
  return (
    <React.Fragment>
      <dt className={meta.key}>{meta.label}:</dt>
      <dd className={meta.key}>{schema[meta.key]}</dd>
    </React.Fragment>
  )
}

export default Default

Default.propTypes = {
  meta: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}
