import React from 'react'
import PropTypes from 'prop-types'

export const LinkedLogo = ({ href, src, alt }) => {
  if (!href || !src || !alt) {
    return null
  }
  return (
    <a href={href}>
      <img src={src} alt={alt} />
    </a>
  )
}

LinkedLogo.propTypes = {
  href: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
}

export default LinkedLogo
