import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import Thumbnail from 'components/Shared/Thumbnail'

export const ImageSection = ({ iiifManifest }) => {
  return (
    <section>
      <Link to={`/viewer?manifest=${encodeURIComponent(iiifManifest.id)}`}>
        <Thumbnail src={iiifManifest.thumbnail} />
      </Link>
      <section>ALTERNATE VIEWS</section>
    </section>
  )
}

ImageSection.propTypes = {
  iiifManifest: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.object.isRequired,
  }).isRequired,
}
export default ImageSection
