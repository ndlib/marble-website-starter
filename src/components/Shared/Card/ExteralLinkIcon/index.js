import React from 'react'
import PropTypes from 'prop-types'
import { isExternal } from 'components/Shared/Link'
import openInNew from 'assets/icons/svg/baseline-open_in_new-24px-white.svg'
import style from './style.module.css'

const ExteralLinkIcon = ({ target }) => {
  if (isExternal(target)) {
    return (
      <span className={style.iconWrapper}>
        <img
          src={openInNew}
          alt='Link to external site.'
          title='Link to external site.'
        />
      </span>
    )
  }
  return null
}

ExteralLinkIcon.propTypes = {
  target: PropTypes.string.isRequired,
}
export default ExteralLinkIcon
