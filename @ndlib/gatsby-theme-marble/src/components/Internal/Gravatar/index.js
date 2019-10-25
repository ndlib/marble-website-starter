import React from 'react'
import PropTypes from 'prop-types'
import gravatar from 'gravatar'
import style from './style.module.css'
export const Gravatar = ({ email, size }) => {
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
  email: PropTypes.string.isRequired,
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
    }
  )
}
