/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import sx from './sx'

const NDBrandHeroBackgroundOnly = ({ variant }) => {
  return (
    <div id='page-header' variant={`pageHeaders.${variant}`} sx={sx.backgroundHeroBanner} />
  )
}

NDBrandHeroBackgroundOnly.propTypes = {
  variant: PropTypes.string.isRequired,
}

NDBrandHeroBackgroundOnly.defaultProps = {
  variant: 'default',
}

export default 
