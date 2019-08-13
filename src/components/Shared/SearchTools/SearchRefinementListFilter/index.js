import React from 'react'
import PropTypes from 'prop-types'
import {
  RefinementListFilter,
} from 'searchkit'

const SearchRefinementListFilter = ({ field, label, operator }) => {
  if (!field || !label) {
    return null
  }
  return (
    <RefinementListFilter
      field={field}
      id={label.replace(' ', '').toLowerCase()}
      title={label}
      operator={operator}
    />
  )
}
SearchRefinementListFilter.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  operator: PropTypes.string,
}

SearchRefinementListFilter.defaultProps = {
  operator: 'OR',
}

export default SearchRefinementListFilter
