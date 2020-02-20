import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import imgIIIF from './iiif.png'
import style from './style.module.css'

const ManifestLink = ({ manifestUrl }) => {
  if (!manifestUrl) {
    return null
  }
  return (
    <React.Fragment>
      <Link
        to={manifestUrl}
        target='_blank'
        className={style.manifestLink}
      >
        <img
          src={imgIIIF}
          alt='Download IIIF manifest.'
          title='Download IIIF manifest.'

        />
      </Link>
      <Link
        className={style.manifestLink}
        to='https://sites.nd.edu/marble/iiif-at-notre-dame-or-the-heart-of-marble/'
        target='_blank'
      >
        What is IIIF
      </Link>
    </React.Fragment>
  )
}

ManifestLink.propTypes = {
  manifestUrl: PropTypes.string.isRequired,
}
export default ManifestLink
