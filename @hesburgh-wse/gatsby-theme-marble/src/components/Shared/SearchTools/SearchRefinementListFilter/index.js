import React from 'react'
import PropTypes from 'prop-types'
import {
  RefinementListFilter,
} from 'searchkit'

const SearchRefinementListFilter = ({ field, label, operator, defaultSearch }) => {
  if (defaultSearchIsThisField(defaultSearch, field)) {
    return null
  }

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
  defaultSearch: PropTypes.array,
  operator: PropTypes.string,
}

SearchRefinementListFilter.defaultProps = {
  operator: 'OR',
}

const defaultSearchIsThisField = (defaultSearch, field) => {
  if (defaultSearch && defaultSearch[0]) {
    const tags = defaultSearch[0].tag.split(':')
    if (tags[0] === field) {
      return true
    }
  }

  return false
}

export default SearchRefinementListFilter
