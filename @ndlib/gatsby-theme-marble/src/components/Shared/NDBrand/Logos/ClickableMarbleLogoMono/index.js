/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Image } from 'theme-ui'
import PropTypes from 'prop-types'
import marbleLogo from '@ndlib/gatsby-theme-marble/src/assets/logos/Marble.Logo.Mono.Small.svg'

const ClickableMarbleLogoMono = ({ variant, width, height }) => {
  return (
    <div sx={{ variant: variant }}>
      <a href='https://marble.nd.edu/' title='Marble: Museums, Archives, Rare Books and Libraries Exploration'>
        <Image src={marbleLogo} width={width} height={height} alt='Marble: Museums, Archives, Rare Books and Libraries Exploration' />
      </a>
    </div>
  )
}

ClickableMarbleLogoMono.propTpyes = {
  variant: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

ClickableMarbleLogoMono.defaultProps = {
  variant: 'ClickableNDLogoWhite.primary',
  width: 200,
  height: 48,
}

export default ClickableMarbleLogoMono
