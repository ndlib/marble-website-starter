import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import Gravatar from 'components/Internal/Gravatar'
import style from './style.module.css'

const UserCartouche = ({ user }) => {
  return (
    <Link
      to={`/user/${user.username}`}
      className={style.cartouche}
    >
      <span className={style.gravatarWrapper}>
        <Gravatar
          email={user.email}
          size={22}
        />
      </span>
      {user.name}
    </Link>
  )
}

UserCartouche.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserCartouche
