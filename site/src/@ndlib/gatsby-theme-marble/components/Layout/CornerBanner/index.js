import React from 'react'
import style from './style.module.css'

const CornerBanner = () => {
  return (
    <a
      href='https://innovation.library.nd.edu/marble/'
      className={style.constructionBanner}
    >
      <div className={style.constructionStripes} />
      <div className={style.versionText}>Beta Preview</div>
      <div className={style.constructionStripes} />
    </a>
  )
}

export default CornerBanner
