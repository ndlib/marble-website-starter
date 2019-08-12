import React from 'react'
import PropTypes from 'prop-types'

const SavedSearch = ({ terms, location }) => {
  console.log(terms, location)
  return (
    <div>Saved search: [{terms.join(', ')}]</div>
  )
}

SavedSearch.propTypes = {
  location: PropTypes.object.isRequired,
  terms: PropTypes.string,
}

SavedSearch.defaultProps = {
  terms: '',
}
export default SavedSearch
