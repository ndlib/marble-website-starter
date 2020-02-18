import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Gravatar from 'components/Internal/Gravatar'
import style from './style.module.css'

const UserCartouche = ({ user }) => {
  return (
    <span
      role='button'
      onClick={() => {
        navigate(`/user/${user.userName}`)
      }}
      className={style.cartouche}
    >
      <span className={style.gravatarWrapper}>
        <Gravatar
          email={user.email}
          size={22}
        />
      </span>
      {user.name}
    </span>
  )
}

UserCartouche.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
}

export default UserCartouche
