import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import favicon from 'assets/icons/favicon.png'
const CanonicalLink = ({ base, pathname }) => {
  if (!pathname) {
    return null
  }
  return (
    <Helmet>
      <link rel='icon' href={favicon} />
      <link rel='canonical' href={`${base}${pathname}`} />
    </Helmet>
  )
}

CanonicalLink.propTypes = {
  base: PropTypes.string.isRequired,
  pathname: PropTypes.string,
}

export default CanonicalLink
