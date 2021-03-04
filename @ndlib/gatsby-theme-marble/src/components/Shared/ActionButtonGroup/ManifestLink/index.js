/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Link from 'components/Shared/Link'
import imgIIIF from './iiif.png'
import HelpLink from './HelpLink'
import sx from './sx'

const ManifestLink = ({ manifestUrl }) => {
  if (!manifestUrl) {
    return null
  }
  const label = 'Download IIIF manifest.'
  return (
    <span sx={sx.wrapper}>
      <Link
        to={manifestUrl}
        target='_blank'
        sx={sx.manifestLink}
        aria-label={label}
      >
        <img
          src={imgIIIF}
          alt={label}
          title={label}
          sx={sx.image}
        />
      </Link>
      <HelpLink />
    </span>
  )
}

ManifestLink.propTypes = {
  manifestUrl: PropTypes.string.isRequired,
}
export default ManifestLink
