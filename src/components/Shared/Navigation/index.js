import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import { Link } from 'gatsby'

export const Navigation = ({ links, navClass }) => {
  return (
    <nav className={navClass}>
      { links.map(l => {
        return <Link to={l.link} key={l.title}>{l.title}</Link>
      })}
    </nav>
  )
}
Navigation.propTypes = {
  links: PropTypes.array.isRequired,
  navClass: PropTypes.string,
}

export default Navigation
