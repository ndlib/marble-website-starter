import React from 'react'
import PropTypes from 'prop-types'

const TitleMicro = ({ meta, schema }) => {
  return (
    <h1 className={meta.key}> {schema[meta.key]} </h1>
  )
}

export default TitleMicro

TitleMicro.propTypes = {
  meta: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}
