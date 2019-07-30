import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import Image from 'components/Shared/Image'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'
import getImageService from 'utils/getImageService'
import buildReferalState from 'utils/buildReferalState'
import style from './style.module.css'
export const ImageSection = ({ location, iiifManifest }) => {
  if (!iiifManifest || !iiifManifest.id) {
    return null
  }

  return (
    <section>
      <h2 className='accessibilityOnly'>Images</h2>
      <Link
        to={`/viewer?manifest=${encodeURIComponent(iiifManifest.id)}`}
        className={style.link}
        state={buildReferalState(location, { type: 'item', backLink: location.href })}
      >
        <Image
          service={getImageService(iiifManifest)}
          alt={iiifManifest.description}
          className={style.bigImage}
          title='Open in Universal Viewer'
          iiifManifest={iiifManifest}
        />
        <ExpandIcon />
      </Link>
      <ItemAlternateViews iiifManifest={iiifManifest} location={location} />
    </section>
  )
}

ImageSection.propTypes = {
  iiifManifest: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  location: PropTypes.object.isRequired,
}
export default ImageSection
