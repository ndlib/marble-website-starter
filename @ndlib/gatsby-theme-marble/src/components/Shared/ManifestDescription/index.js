import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const ManifestDescription = ({ ndJson }) => {
  if (ndJson && ndJson.description) {
    return (
      <div className={style.descriptionBlock}>
        <p>{ndJson.description}</p>
      </div>
    )
  }
  return null
}

ManifestDescription.propTypes = {
  ndJson: PropTypes.shape({
    description: PropTypes.string,
  }),
}

export default ManifestDescription
