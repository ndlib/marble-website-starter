import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import imgIIIF from './iiif.png'
import style from './style.module.css'

const ManifestLink = ({ manifestUrl }) => {
  if (!manifestUrl) {
    return null
  }
  return (
    <Link
      to={manifestUrl}
      target='_blank'
    >
      <img
        src={imgIIIF}
        alt='Download IIIF manifest.'
        className={style.manifestLink}
      />
    </Link>
  )
}

ManifestLink.propTypes = {
  manifestUrl: PropTypes.string.isRequired,
}
export default ManifestLink
