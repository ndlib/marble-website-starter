/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const MetaDataValue = ({ values, styles }) => {
  return (
    <>
      {
        values.map(val => {
          return (
            <dd sx={styles} key={val}>
              {val}
            </dd>
          )
        })
      }
    </>
  )
}

MetaDataValue.propTypes = {
  values: PropTypes.array,
}

export default MetaDataValue
