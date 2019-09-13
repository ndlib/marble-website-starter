import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import gravatar from 'gravatar'
import checkImage from 'utils/checkImage'
import style from './style.module.css'
import DEFAULT_IMAGE from 'assets/images/noUser.svg'
const Gravatar = ({ email, size }) => {
  const [src, setSrc] = useState(
    gravatar.url(
      email,
      {
        protocol: 'https',
        size: size ? `${size}` : '100',
        rating: 'pg',
        default: 'retro',
      }
    )
  )

  useEffect(() => {
    checkImage(src).then(result => {
      if (result.status !== 'ok') {
        setSrc(DEFAULT_IMAGE)
      }
    })
  })

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
