import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from 'components/Internal/Link'
import style from './style.module.css'

export const ReturnToSearch = ({ location }) => {
  console.log('l', location)
  if (typy(location, 'state.referal.type').safeString === 'search') {
    return (
      <nav className={style.returnToSearch}>
        <Link
          to={`/search${location.state.referal.query}`}
        >≪ Return to Search</Link>
      </nav>
    )
  }
  return null
}

ReturnToSearch.propTypes = {
  location: PropTypes.object,
}

export default ReturnToSearch
