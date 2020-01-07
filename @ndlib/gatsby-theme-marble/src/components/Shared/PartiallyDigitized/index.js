/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
const PartiallyDigitized = ({ iiifManifest }) => {
  if (iiifManifest.partiallyDigitized) {
    return (
      <div
        sx={{
          backgroundColor: 'gray.1',
          padding: '0.5rem',
        }}><b>Dataset not complete.</b> &mdash; This content may be only partially digitized.</div>
    )
  }
  return null
}

PartiallyDigitized.propTypes = {
  iiifManifest: PropTypes.shape({
    partiallyDigitized: PropTypes.string,
  }),
}

export default PartiallyDigitized
