import React from 'react'
import PropTypes from 'prop-types'

const LinkMicro = ({ meta, schema }) => {
  return (
    <React.Fragment>
      <a href={schema[meta.key]}>{meta.label}</a>
    </React.Fragment>
  )
}

export default LinkMicro

LinkMicro.propTypes = {
  meta: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}
