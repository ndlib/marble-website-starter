import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import Gravatar from 'components/Internal/Gravatar'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import { ownsPage } from 'utils/auth'
import style from './style.module.css'

const Ownership = ({ compilation, loginReducer }) => {
  const { visibility, user } = compilation
  const isOwner = ownsPage(loginReducer, user.username)
  if (isOwner) {
    return (
      <div className={style.ownership}>You manage this <VisibilityLabel visibility={visibility} /> compilation.</div>
    )
  }
  return (
    <div className={style.ownership}>
      <span>Created by <Link to={`/user/${user.username}`}>
        <span className={style.gravatarWrapper}>
          <Gravatar
            email={user.email}
            size={22}
          />
        </span>
        {user.name}
      </Link></span>
    </div>
  )
}

Ownership.propTypes = {
  compilation: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export default Ownership
