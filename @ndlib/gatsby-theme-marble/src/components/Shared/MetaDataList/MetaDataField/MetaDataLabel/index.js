/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const MetaDataLabel = ({ labels, styles }) => {
  return (
    <>
      {
        labels.map(val => {
          return (
            <dt sx={styles} key={val}>{val}</dt>
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
