/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import sx from './sx.js'

const MetaDataLabel = ({ labels }) => {
  return (
    <>
      {
        labels.map(val => {
          return (
            <dt sx={sx.dt} key={val}>{val}</dt>
          )
        })
      }
    </>
  )
}

MetaDataLabel.propTypes = {
  labels: PropTypes.array,
}

MetaDataLabel.defaultProps = {
  skipHtml: false,
}
export default MetaDataLabel
