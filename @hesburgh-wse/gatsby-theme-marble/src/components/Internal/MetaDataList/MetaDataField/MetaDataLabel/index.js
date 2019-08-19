import React from 'react'
import PropTypes from 'prop-types'

const MetaDataLabel = ({ labels }) => {
  return (
    <React.Fragment>
      {
        labels.map(val => {
          return (
            <dt key={val}>{val}</dt>
          )
        })
      }
    </React.Fragment>
  )
}

MetaDataLabel.propTypes = {
  labels: PropTypes.array,
}

MetaDataLabel.defaultProps = {
  skipHtml: false,
}
export default MetaDataLabel
