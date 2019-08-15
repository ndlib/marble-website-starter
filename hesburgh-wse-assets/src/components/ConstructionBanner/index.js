import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const ConstructionBanner = ({ text, target }) => {
  return (
    <a
      href={target}
      className={style.constructionBanner}
    >
      <div className={style.constructionStripes} />
      <div className={style.versionText}>{text}</div>
      <div className={style.constructionStripes} />
    </a>
  )
}

ConstructionBanner.propTypes = {
  text: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
}
export default ConstructionBanner
