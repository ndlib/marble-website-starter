import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import style from './style.module.css'

// TODO: MAKE BREADCRUMBS WORK
export const Breadcrumb = ({ title, crumbs }) => {
  const displayCrumbs = buildCrumbs(crumbs)
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
  crumbs: PropTypes.array,
}

export default Breadcrumb

export const buildCrumbs = (extraCrumbs) => {
  let crumbs = [
    { to: '/', label: 'Home' },
  ]
  if (extraCrumbs) {
    crumbs = crumbs.concat(extraCrumbs)
  } else {
    crumbs.push({ to: '/browse', label: 'Browse' })
  }
  console.log(crumbs)
  return crumbs
}
