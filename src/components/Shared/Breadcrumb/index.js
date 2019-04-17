import React from 'react'
import { Link } from 'gatsby'
import style from './style.module.css'

// TODO: MAKE BREADCRUMBS WORK
export const Breadcrumb = () => {
  const crumbs = buildCrumbs()
  const itemTitle = 'TITLE'

  return (
    <nav className={style.breadcrumbs}>
      {crumbs.map(crumb => {
        return <Link to={crumb.to} key={crumb.to}>{crumb.label}</Link>
      })}
      <span>{itemTitle}</span>
    </nav>
  )
}

export default Breadcrumb

export const buildCrumbs = () => {
  const crumbs = [
    { to: '/', label: 'Home' },
  ]

  crumbs.push({ to: '/browse', label: 'Browse' })
  return crumbs
}
