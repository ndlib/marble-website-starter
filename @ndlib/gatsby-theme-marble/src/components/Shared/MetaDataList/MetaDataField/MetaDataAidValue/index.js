/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import { jsx } from 'theme-ui'

const MetaDataAidValue = ({ values, styles }) => {
  return (
    <>
      {
        values.map(val => {
          return (
            <dd sx={styles} key={val}>
              <Link to={val} target='_blank' rel='noopener noreferrer' >
                {val}
              </Link>
            </dd>
          )
        })
      }
    </>
  )
}

MetaDataAidValue.propTypes = {
  values: PropTypes.array,
}

export default MetaDataAidValue
