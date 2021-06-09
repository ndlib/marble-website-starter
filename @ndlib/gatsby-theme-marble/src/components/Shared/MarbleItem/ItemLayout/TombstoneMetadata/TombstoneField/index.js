/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'

const TombstoneField = ({ field, sxStyle, searchField, uriValue, icon, filterTitle }) => {
  return (
    <div sx={sxStyle}>
      {
        field.map((values, i) => {
          return values.value.map((value, j) => {
            const uri = uriValue != null ? uriValue : encodeURIComponent(value)
            let title = value
            if (filterTitle) {
              title = value.replace(new RegExp(filterTitle), '')
            }
            return searchField ? (
              <Link
                key={`${i}-${j}`}
                to={`/search?${searchField}=${uri}`}
              >{icon} {title}
              </Link>
            ) : (
              <span key={`${i}-${j}`}>{icon} {title}</span>
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
  icon: PropTypes.object,
  filterTitle: PropTypes.string,
}

export default TombstoneField
