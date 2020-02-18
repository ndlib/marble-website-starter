import React from 'react'
import PropTypes from 'prop-types'
import gravatar from 'gravatar'
import style from './style.module.css'
import NoUserImage from 'assets/images/noUser.svg'
export const Gravatar = ({ email, size }) => {
  if (!email) {
    return (
      <img
        src={NoUserImage}
        alt={`User unavailable`}
        className={style.gravatar}
      />
    )
  }
  const src = gravatarImg(email, size)
  return (
    <img
      src={src}
      alt={`Globally Recognized Avatar for ${email}`}
      className={style.gravatar}
    />
  )
}

Gravatar.propTypes = {
  email: PropTypes.string,
  size: PropTypes.number,
}
export default Gravatar

export const gravatarImg = (email, size = 400) => {
  return gravatar.url(
    email,
    {
      protocol: 'https',
      size: size,
      rating: 'pg',
      default: 'retro',
    },
  )
}
