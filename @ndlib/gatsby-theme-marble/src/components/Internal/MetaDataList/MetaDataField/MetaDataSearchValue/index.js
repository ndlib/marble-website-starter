import React from 'react'
import PropTypes from 'prop-types'
// import { Styled } from 'theme-ui'
import Link from 'components/Internal/Link'

const MetaDataSearchValue = ({ values }) => {
  return (
    <>
      {
        values.map(val => {
          const search = '/search?q=' + val
          return (
            <dd key={val}>
              <Link to={search}>{val}</Link>
            </dd>
          )
        })
      }
    </>
  )
}

MetaDataSearchValue.propTypes = {
  values: PropTypes.array,
}

MetaDataSearchValue.defaultProps = {
  skipHtml: false,
}
export default MetaDataSearchValue
