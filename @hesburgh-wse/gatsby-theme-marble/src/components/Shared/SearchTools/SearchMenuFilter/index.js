import React from 'react'
import PropTypes from 'prop-types'
import {
  ItemList,
  MenuFilter,
} from 'searchkit'

const SearchMenuFilter = ({ field, label }) => {
  if (!field || !label) {
    return null
  }
  return (
    <MenuFilter
      field={field}
      id={label.replace(' ', '').toLowerCase()}
      title={label}
      listComponent={ItemList}
      translations={{ '18thcentury':'18th Century' }}
    />
  )
}
SearchMenuFilter.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}
export default SearchMenuFilter
