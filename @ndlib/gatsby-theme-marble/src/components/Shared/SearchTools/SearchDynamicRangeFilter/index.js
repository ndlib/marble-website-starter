import React from 'react'
import PropTypes from 'prop-types'
import { DynamicRangeFilter } from 'searchkit'

const SearchDynamicRangeFilter = ({ field, label }) => {
  if (!field || !label) {
    return null
  }
  return (
    <DynamicRangeFilter
      field={field}
      id={label.replace(' ', '').toLowerCase()}
      title={label}
    />
  )
}
SearchDynamicRangeFilter.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}
export default SearchDynamicRangeFilter
