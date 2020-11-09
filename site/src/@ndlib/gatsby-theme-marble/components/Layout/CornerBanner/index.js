import React from 'react'
import style from './style.module.css'
import Link from 'components/Internal/Link'

const CornerBanner = () => {
  return (
    <a
      href='https://innovation.library.nd.edu/marble/'
      className={style.constructionBanner}
    >
      <div className={style.constructionStripes} />
      <div className={style.versionText}>This is a beta preview of the MARBLE website.</div>
      <div className={style.constructionStripes} />
    </a>
  )
}

export default CornerBanner
