import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
const SchemaLink = ({ pathname }) => {
  if (!pathname) {
    return null
  }
  return (
    <Helmet>
      <link rel='http://schema.org' href={`${pathname}`} />
    </Helmet>
  )
}

SchemaLink.propTypes = {
  pathname: PropTypes.string,
}

export default SchemaLink
