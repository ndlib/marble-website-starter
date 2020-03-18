/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const HeroBox = ({ children, backgroundImage, dark = false }) => {
  console.log('x', backgroundImage)
  return (
    <div
      sx={{
        borderBottom: '14px solid',
        borderColor: 'primary',
        backgroundColor: dark ? 'gray.1' : 'gray.1',
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : null,
        backgroundPosition: 'center',
        color: dark ? 'white' : 'black',
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
  dark: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  backgroundImage: PropTypes.string,
}

export default HeroBox
