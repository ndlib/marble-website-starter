/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Image } from 'theme-ui'
import ndLogo from '@ndlib/gatsby-theme-marble/src/assets/logos/rbsc-logo.svg'

const ClickableRBSCLogoWhite = ({ variant, width, height }) => {
  return (
    <div sx={{ variant: variant }}>
      <a href='https://rarebooks.library.nd.edu/' >
        <Image src={ndLogo} width={width} height={height} alt='Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame' />
      </a>
    </div>
  )
}

ClickableRBSCLogoWhite.propTpyes = {
  variant: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

ClickableRBSCLogoWhite.defaultProps = {
  variant: 'ClickableRBSCLogoWhite.primary',
  width: 255,
  height: 45,
}

export default ClickableRBSCLogoWhite
