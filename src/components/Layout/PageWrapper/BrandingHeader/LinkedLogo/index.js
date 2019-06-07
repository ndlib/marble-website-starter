import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'

export const LinkedLogo = ({ href, src, alt }) => {
  if (!href || !src || !alt) {
    return null
  }
  return (
    <Link to={href}>
      <img
        src={src}
        alt={alt}
        title={alt} />
    </Link>
  )
}

LinkedLogo.propTypes = {
  href: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
}

export default LinkedLogo
