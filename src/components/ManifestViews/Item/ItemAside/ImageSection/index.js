import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
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
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
}
export default ImageSection
