import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import Link from 'components/Shared/Link'

const BrowsePager = ({ parentCategory }) => {
  const links = [
    { label: 'All', target: '/browse/' },
    { label: 'Time', target: '/browse/timeperiods/' },
    { label: 'Place', target: '/browse/places/' },
    { label: 'Theme', target: '/browse/themes/' },
  ]

  return (
    <div className={style.browsePager}>
      {
        links.map(link => {
          return (
            <Link
              to={link.target}
              key={link.target}
              activeClassName={style.active}
              className={activeParent(parentCategory, link.target) ? style.active : ''}
            >{link.label}</Link>
          )
        })
      }
    </div>
  )
}

BrowsePager.propTypes = {
  parentCategory: PropTypes.object.isRequired,
}

export default BrowsePager

const activeParent = (parentCategory, target) => {
  return target === `${parentCategory.slug}/`.replace('website/', '')
}
