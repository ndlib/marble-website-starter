import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

export const FormattedLabel = ({ displayValue, description }) => {
  return (
    <React.Fragment>
      <span className={style.value}>{displayValue}</span>
      <span className={style.description}>{description}</span>
    </React.Fragment>
  )
}
FormattedLabel.propTypes = {
  displayValue: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
export default FormattedLabel
