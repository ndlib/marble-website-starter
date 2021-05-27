import React from 'react'
import * as style from './style.module.css'

const Loading = () => {
  return (
    <div className={style.skThreeBounce}>
      <div className={`${style.skChild} ${style.skBounce1}`} />
      <div className={`${style.skChild} ${style.skBounce2}`} />
      <div className={`${style.skChild} ${style.skBounce3}`} />
    </div>
  )
}

export default Loading
