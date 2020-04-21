/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const VisibilityLabel = ({ visibility }) => {
  return <strong sx={{
    color: 'gray.4',
    backgroundColor: 'primary.0',
    borderRadius: '10px',
    fontFamily: 'bold',
    fontSize: '.75rem',
    fontVariant: 'small-caps',
    padding: '0.5rem 1rem',
    verticalAlign: 'middle',
  }}>{visibility.toUpperCase()}</strong>
}

VisibilityLabel.propTypes = {
  visibility: PropTypes.oneOf([
    'public',
    'shared',
    'private',
  ]).isRequired,
}

export default VisibilityLabel
