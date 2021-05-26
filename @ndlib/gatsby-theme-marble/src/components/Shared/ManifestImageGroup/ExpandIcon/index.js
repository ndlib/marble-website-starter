import React from 'react'
import PropTypes from 'prop-types'
import expandIcon from 'assets/icons/svg/baseline-fullscreen-24px.svg'
import * as style from './style.module.css'
const ExpandIcon = ({ label }) => {
  return (
    <span className={style.expandWrapper}>
      <img
        src={expandIcon}
        alt={label}
        className={style.expandIcon}
        title={label}
      />
    </span>
  )
}
ExpandIcon.propTypes = {
  label: PropTypes.string.isRequired,
}
export default ExpandIcon
