import React from 'react'
import expandIcon from 'assets/icons/svg/baseline-fullscreen-24px.svg'
import style from './style.module.css'
const ExpandIcon = () => {
  return (
    <span className={style.expandWrapper}>
      <img
        src={expandIcon}
        alt='Open in Universal Viewer'
        className={style.expandIcon}
        title='Open in Universal Viewer'
      />
    </span>
  )
}

export default ExpandIcon
