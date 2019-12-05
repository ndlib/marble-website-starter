import React from 'react'
import PropTypes from 'prop-types'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import style from './style.module.css'
export const FormattedLabel = ({ value, description }) => {
  return (
    <React.Fragment>
      <span className={style.visibilityLabel}>
        <VisibilityLabel visibility={value} />
      </span>
      <span className={style.description}>
        {description}
      </span>
    </React.Fragment>
  )
}

FormattedLabel.propTypes = {
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default FormattedLabel
