import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from 'components/Shared/Link'
import style from './style.module.css'

// TODO: MAKE BREADCRUMBS WORK
export const Breadcrumb = ({ title, location }) => {
  const displayCrumbs = buildCrumbs(location)
  const itemTitle = title

  return (
    <nav className={style.breadcrumbs}>
      {displayCrumbs.map(crumb => {
        return <Link to={crumb.to} key={crumb.to}>{crumb.label}</Link>
      })}
      <span>{itemTitle}</span>
    </nav>
  )
}

Breadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.object,
}

export default Breadcrumb

// eslint-disable-next-line complexity
export const buildCrumbs = (location) => {
  const crumbs = [
    { to: '/', label: 'Home' },
  ]

  if (typy(location, 'state.crumbs.referal.type').isTruthy) {
    switch (location.state.crumbs.referal.type) {
      case 'browse':
      case 'item':
      case 'collection':
        crumbs.push({
          to: location.state.crumbs.referal.target,
          label: location.state.crumbs.referal.label,
        })
        break
      case 'search':
        crumbs.push({
          to: `/search${location.state.crumbs.referal.query}`,
          label: 'Search',
        })
        break
      default:
        break
    }
  }
  return crumbs
}
