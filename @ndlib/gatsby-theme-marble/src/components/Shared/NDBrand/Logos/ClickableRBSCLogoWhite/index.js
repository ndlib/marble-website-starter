/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Image } from 'theme-ui'
import ndLogo from '@ndlib/gatsby-theme-marble/src/assets/logos/hesburgh_mark_H2_white.svg'
import rbsc from '@ndlib/gatsby-theme-marble/src/assets/logos/rbsc.svg'

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
            width: ['400px', '400px', '400px', '255px'],
          }} />
      </a>
      <a href='https://rarebooks.library.nd.edu/' >
        <Image
          src={rbsc}
          width={30}
          height={30}
          alt='Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame'
          sx={{
            display: 'block',
            height: ['30px'],
            maxWidth:['30px'],
            width: ['45px', '30px', '30px', '30px'],
          }}
        />
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
