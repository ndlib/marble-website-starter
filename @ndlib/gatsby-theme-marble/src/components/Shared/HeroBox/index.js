/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const HeroBox = ({ children, backgroundImage }) => {
  return (
    <div
      sx={{
        borderBottom: '14px solid',
        borderColor: 'primary',
        backgroundColor: 'primary',
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : null,
        backgroundPosition: 'center',
        color: 'primaryText.0',
        padding: '1rem',
        paddingLeft: '1000rem',
        paddingRight: '1000rem',
        marginTop: '-1rem',
        marginLeft: '-1000rem',
        marginRight: '-1000rem',
      }}>
      {children}
    </div>
  )
}

HeroBox.propTypes = {
  children: PropTypes.node,
  backgroundImage: PropTypes.string,
}

export default HeroBox
