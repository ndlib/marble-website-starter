import React from 'react'
import typy from 'typy'
import PropTypes from 'prop-types'
import icon from 'assets/icons/svg/baseline-collections-modified-24px.svg'
import style from '../style.module.css'

const TypeLabel = ({ iiifManifest }) => {
  const type = typy(iiifManifest, 'type').safeString.toLowerCase()
  if (type === 'collection') {
    return (
      <div className={style.typeLabel}><img src={icon} alt='' /></div>
    )
  }
  return null
}

TypeLabel.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default TypeLabel
