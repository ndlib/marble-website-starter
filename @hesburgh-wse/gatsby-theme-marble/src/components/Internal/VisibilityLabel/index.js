import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const VisibilityLabel = ({ visibility }) => {
  switch (visibility) {
    case 'public':
      return <strong className={style.isPublic}>PUBLIC</strong>
    case 'shared':
      return <strong className={style.isPublic}>SHARED</strong>
    case 'private':
      return <strong className={style.isPrivate}>PRIVATE</strong>
    default:
      return null
  }
}

VisibilityLabel.propTypes = {
  visibility: PropTypes.oneOf([
    'public',
    'shared',
    'private',
  ]).isRequired,
}

export default VisibilityLabel
