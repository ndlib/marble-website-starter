import React from 'react'
import PropTypes from 'prop-types'
import {
  RefinementListFilter,
} from 'searchkit'

const listOrder = (list) => {
  list.sort((a, b) => {
    return a.key.localeCompare(b.key, undefined, { numeric: true })
  })

  return list
}

const SearchRefinementListFilter = ({ field, label, operator, defaultSearch, size }) => {
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
      bucketsTransform={listOrder}
      size={parseInt(size)}
    />
  )
}
SearchRefinementListFilter.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultSearch: PropTypes.array,
  operator: PropTypes.string,
  size: PropTypes.string,
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
