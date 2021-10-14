/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Image } from 'theme-ui'
import ndLogo from '@ndlib/gatsby-theme-marble/src/assets/logos/hesburgh_mark_H2_white.svg'
import rbsc from '@ndlib/gatsby-theme-marble/src/assets/logos/rbsc.svg'

const ClickableRBSCLogoWhite = ({ variant, width, height, rbscWidthHeight }) => {
  return (
    <div sx={{ variant: variant }}>
      <a href='https://www.library.nd.edu/' >
        <Image src={ndLogo} width={width} height={height} alt='Hesburgh Libraries, University of Notre Dame' sx={{ marginBottom: '0.5rem !important' }} />
      </a>
      <a href='https://rarebooks.library.nd.edu/' >
        <Image src={rbsc} width={rbscWidthHeight} height={rbscWidthHeight} sx={{ maxWidth: `${rbscWidthHeight}px`, display: 'block' }} alt='Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame' />
      </a>
    </div>
  )
}

ClickableRBSCLogoWhite.propTypes = {
  variant: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rbscWidthHeight: PropTypes.number.isRequired,
}

ClickableRBSCLogoWhite.defaultProps = {
  variant: 'ClickableRBSCLogoWhite.primary',
  width: 255,
  height: 45,
  rbscWidthHeight: 30,
}

export default ClickableRBSCLogoWhite
