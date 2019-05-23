import React from 'react'
import style from './style.module.css'
import packageJson from '../../../../package.json'

const ConstructionBanner = () => {
  return (
    <a
      href='https://innovation.library.nd.edu/marble/'
      className={style.constructionBanner}>
      <div className={style.constructionStripes} />
      <div className={style.versionText}>Alpha Release: {packageJson.version}</div>
      <div className={style.constructionStripes} />
    </a>
  )
}

export default ConstructionBanner
