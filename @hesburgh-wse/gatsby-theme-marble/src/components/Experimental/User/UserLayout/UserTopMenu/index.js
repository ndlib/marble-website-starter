import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import style from '../style.module.css'

const UserTopMenu = ({ username }) => {
  return (
    <nav className={style.pageOptions}>
      <Link
        to={`/user/${username}`}
        getProps={({ isCurrent }) => {
          return {
            style: {
              borderBottom: isCurrent ? '1px solid #dedede' : 'none',
            },
          }
        }}>Compilations</Link>
      <Link
        to={`/user/${username}/following`}
        getProps={({ isCurrent }) => {
          return {
            style: {
              borderBottom: isCurrent ? '1px solid #dedede' : 'none',
            },
          }
        }}>Following</Link>
    </nav>
  )
}

UserTopMenu.propTypes = {
  username: PropTypes.string.isRequired,
}

export default UserTopMenu
