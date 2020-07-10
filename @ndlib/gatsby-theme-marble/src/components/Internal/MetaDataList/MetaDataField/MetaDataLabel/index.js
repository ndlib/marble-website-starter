import React from 'react'
import PropTypes from 'prop-types'

const MetaDataLabel = ({ labels }) => {
  return (
    <>
      {
        labels.map(val => {
          return (
            <dt key={val}>{val}</dt>
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
