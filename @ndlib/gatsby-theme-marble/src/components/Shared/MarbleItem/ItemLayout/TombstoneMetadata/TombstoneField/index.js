/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'

const TombstoneField = ({ field, sxStyle, searchField, uriValue }) => {
  return (
    <div sx={sxStyle}>
      {
        field.map((values, i) => {
          return values.value.map((value, j) => {
            const uri = uriValue != null ? uriValue : encodeURI(value).replace(/&/g, '%26')
            return searchField ? (
              <Link
                key={`${i}-${j}`}
                to={`/search?${searchField}=${uri}`}
              >{value}
              </Link>
            ) : (
              <span key={`${i}-${j}`}>{value}</span>
            )
          })
        })
      }
    </div>
  )
}

TombstoneField.propTypes = {
  field: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  sxStyle: PropTypes.object,
  searchField: PropTypes.string,
  uriValue: PropTypes.array,
}

export default TombstoneField
