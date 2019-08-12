import React from 'react'
import PropTypes from 'prop-types'

const SavedSearch = ({ terms, location }) => {
  console.log(terms, location)
  // This will be rewritten in a separate pull request
  return (
    <div>Coming soon.</div>
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
