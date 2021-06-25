/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Image } from 'theme-ui'
import PropTypes from 'prop-types'
import marbleLogo from '@ndlib/gatsby-theme-marble/src/assets/logos/Marble.Logo.Mono.Small.svg'

const MarbleLogoMono = ({ variant, ...props }) => {
  return (
    <Image
      variant={variant}
      src={marbleLogo}
      alt='Marble: Museums, Archives, Rare Books and Libraries Exploration'
      {...props}
    />
  )
}

MarbleLogoMono.propTpyes = {
  variant: PropTypes.string,
}

MarbleLogoMono.defaultProps = {
  variant: 'primary',
}

export default MarbleLogoMono
