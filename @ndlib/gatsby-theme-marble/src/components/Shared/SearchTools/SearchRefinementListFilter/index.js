import React from 'react'
import PropTypes from 'prop-types'
import {
  RefinementListFilter,
} from 'searchkit'

const listOrder = (list, sort) => {
  console.log(list, sort)
  if (sort === 'a-z') {
    list.sort((a, b) => {
      return a.key && b.key ? a.key.localeCompare(b.key, undefined, { numeric: true }) : 0
    })
  }

  return list
}

const SearchRefinementListFilter = ({ field, label, operator, defaultSearch, size, sort }) => {
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
      bucketsTransform={(list) => {
        return listOrder(list, sort)
      }}
      size={parseInt(size, 10)}
      sort={sort}
    />
  )
}
SearchRefinementListFilter.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultSearch: PropTypes.array,
  operator: PropTypes.string,
  size: PropTypes.string,
  sort: PropTypes.string,
}

SearchRefinementListFilter.defaultProps = {
  operator: 'OR',
  size: '10',
  sort: 'default',
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
