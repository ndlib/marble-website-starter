import React from 'react'
import style from './style.module.css'

const CornerBanner = () => {
  return (
    <div className={style.bannerBox}>
      <a
        href='https://innovation.library.nd.edu/marble/'
        className={style.constructionBanner}
      >
        <div className={style.constructionStripes} />
        <div className={style.versionText}>Beta Preview</div>
        <div className={style.constructionStripes} />
      </a>
    </div>
  )
}

export default CornerBanner
