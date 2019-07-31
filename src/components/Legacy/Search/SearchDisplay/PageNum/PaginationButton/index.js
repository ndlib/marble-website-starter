import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'components/Internal/Link'
import queryString from 'query-string'

export const PaginationButton = ({ currentPage, prev, searchReducer, location }) => {
  const { nextpage } = searchReducer

  // Do not render if no nextPage on next link OR
  // Do not render if currently on 1st page and prev
  if ((!prev && nextpage) || (prev && currentPage > 1)) {
    const settings = getSettings(prev, currentPage)
    const target = linkTarget(location, settings.targetPage)
    return (
      <Link to={target}>
        <button
          className='pageLink'
        > {settings.label} </button>
      </Link>
    )
  }
  return null
}

PaginationButton.propTypes = {
  searchReducer: PropTypes.object.isRequired,
  prev: PropTypes.bool,
  currentPage: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(PaginationButton)

// Determine which icon to show and if it should go to next or previous page
export const getSettings = (prev, currentPage) => {
  let label = '>'
  let targetPage = currentPage + 1
  if (prev) {
    label = '<'
    targetPage = currentPage - 1
  }
  return {
    label: label,
    targetPage: targetPage,
  }
}

// Build link based on current url and target page number
export const linkTarget = (location, targetPage) => {
  const qs = queryString.parse(location.search)
  qs.page = targetPage
  qs.perpage = qs.perpage || 12
  return `/search?${queryString.stringify(qs)}`
}
