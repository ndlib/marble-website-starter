/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Image } from 'theme-ui'
import ndLogo from '@ndlib/gatsby-theme-marble/src/assets/logos/hesburgh_mark_H2_white.svg'

const ClickableRBSCLogoWhite = ({ variant }) => {
  return (
    <div sx={{ variant: variant }}>
      <a href='https://www.library.nd.edu/' >
        <Image
          src={ndLogo}
          alt='Hesburgh Libraries, University of Notre Dame'
          sx={{
            height: ['60px', '45px', '45px', '45px'],
            marginBottom: '0.5rem !important',
            width: ['400px', '400px', '400px', '100%'],
          }} />
      </a>
    </div>
  )
}

ClickableRBSCLogoWhite.propTypes = {
  variant: PropTypes.string,
}

ClickableRBSCLogoWhite.defaultProps = {
  variant: 'ClickableRBSCLogoWhite.primary',

}

export default ClickableRBSCLogoWhite
