/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Image } from 'theme-ui'
import PropTypes from 'prop-types'
import marbleLogo from '@ndlib/gatsby-theme-marble/src/assets/logos/Marble.Logo.Mono.Small.svg'

const MarbleLogoMono = ({ variant, width, height, ...props }) => {
  return (
    <Image variant={variant} src={marbleLogo} alt='Marble: Museums, Archives, Rare Books and Libraries Exploration' />
  )
}

MarbleLogoMono.propTpyes = {
  variant: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
}

MarbleLogoMono.defaultProps = {
  variant: 'primary',
  width: 200,
  height: 48,
}

export default MarbleLogoMono
