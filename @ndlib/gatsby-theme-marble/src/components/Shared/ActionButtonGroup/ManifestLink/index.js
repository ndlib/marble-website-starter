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
      <a
        className={style.manifestLink}
        href='https://sites.nd.edu/marble/iiif-at-notre-dame-or-the-heart-of-marble/'
      >
        What is IIIF
      </a>
    </React.Fragment>
  )
}

ManifestLink.propTypes = {
  manifestUrl: PropTypes.string.isRequired,
}
export default ManifestLink
