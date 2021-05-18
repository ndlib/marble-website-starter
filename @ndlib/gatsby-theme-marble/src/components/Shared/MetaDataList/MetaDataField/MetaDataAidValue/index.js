import React from 'react'
import PropTypes from 'prop-types'
import { BaseStyles } from 'theme-ui'

const MetaDataAidValue = ({ values }) => {
  return (
    <>
    {
      values.map(val => {
        return (
          <dd key={val}>
            <BaseStyles>
              <a href={val} target='_blank' rel='noopener noreferrer' >
                {val}
              </a>
            </BaseStyles>
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
