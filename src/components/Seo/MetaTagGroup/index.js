import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const MetaTagGroup = ({ tags }) => {
  return (
    <Helmet>
      {
        tags.map((tagProps, index) => {
          tagProps.key = index
          return <meta {...tagProps} />
        })
      }
    </Helmet>
  )
}

MetaTagGroup.propTypes = {
  tags: PropTypes.array.isRequired,
}
export default MetaTagGroup
