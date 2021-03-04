import React from 'react'
import PropTypes from 'prop-types'
import { BaseStyles } from 'theme-ui'

const MetaDataValue = ({ values }) => {
  return (
    <>
      {
        values.map(val => {
          return (
            <dd key={val}>
              <BaseStyles>
                <p>{val}</p>
              </BaseStyles>
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
