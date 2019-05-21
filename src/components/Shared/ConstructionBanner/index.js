import React from 'react'
import style from './style.module.css'
import packageJson from '../../../../package.json'
const ConstructionBanner = () => {
  return (
    <div className={style.constructionBanner}>
      <div className={style.constructionStripes} />
      <div className={style.versionText}>Alpha Release: {packageJson.version}</div>
      <div className={style.constructionStripes} />
    </div>
  )
}

export default ConstructionBanner
