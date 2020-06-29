import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const ManifestDescription = ({ marbleItem }) => {
  if (marbleItem && marbleItem.description) {
    return (
      <div className={style.descriptionBlock}>
        <p>{marbleItem.description}</p>
      </div>
    )
  }
  return null
}

ManifestDescription.propTypes = {
  marbleItem: PropTypes.shape({
    description: PropTypes.string,
  }),
}

export default ManifestDescription
