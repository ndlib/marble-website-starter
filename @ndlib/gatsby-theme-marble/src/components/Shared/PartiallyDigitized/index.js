/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
const PartiallyDigitized = ({ marbleItem }) => {
  if (marbleItem && marbleItem.partiallyDigitized) {
    return (
      <div
        sx={{
          backgroundColor: 'gray.1',
          padding: '0.5rem',
        }}
      ><b>Dataset not complete.</b> &mdash; This content may be only partially digitized.
      </div>
    )
  }
  return null
}

PartiallyDigitized.propTypes = {
  marbleItem: PropTypes.shape({
    partiallyDigitized: PropTypes.bool,
  }),
}

export default PartiallyDigitized
