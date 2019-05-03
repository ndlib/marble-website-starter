import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from 'components/Shared/Link'
import style from './style.module.css'

export const Breadcrumb = ({ location }) => {
  if (typy(location, 'state.crumbs.referal.type').safeString === 'search') {
    return (
      <nav className={style.breadcrumbs}>
        <Link
          to={`/search${location.state.crumbs.referal.query}`}
        >Return to Search</Link>
      </nav>
    )
  }
  return null
}

Breadcrumb.propTypes = {
  location: PropTypes.object,
}

export default Breadcrumb
