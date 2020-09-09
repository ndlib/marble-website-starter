import React from 'react'
import PropTypes from 'prop-types'
import { BaseStyles } from 'theme-ui'
import Link from 'components/Internal/Link'

const MetaDataSearchValue = ({ values, urlField }) => {
  return (
    <>
      {
        values.map(val => {
          const search = '/search?' + urlField + '[0]=' + val
          return (
            <dd key={val}>
              <BaseStyles>
                <Link to={search}>{val}</Link>
              </BaseStyles>
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
