/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Link from 'components/Internal/Link'

const TombstoneField = ({ field, sxStyle, searchField }) => {
  return (
    <div sx={sxStyle}>
      {
        field.map((values, i) => {
          return values.value.map((value, j) => {
            return searchField ? (
              <Link
                key={`${i}-${j}`}
                to={`/search?${searchField}=${encodeURI(value)}`}
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
}

export default TombstoneField
