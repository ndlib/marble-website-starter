/** @jsx jsx */
import PropTypes from 'prop-types'
import ViewerLink from './ViewerLink'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'
import findImage from 'utils/findImage'
import { jsx } from 'theme-ui'
import sx from './sx'

export const ManifestImageGroup = ({ location, marbleItem, viewer, allMarbleIiifImage }) => {
  if (!marbleItem) {
    return null
  }
  let viewerLabel = 'Mirador'
  if (viewer === 'uv') {
    viewerLabel = 'Universal Viewer'
  }
  const label = `Open in ${viewerLabel}`
  return (
    <section>
      <h2 className='accessibilityOnly'>Images</h2>
      <ViewerLink
        marbleItem={marbleItem}
        viewer={viewer}
        location={location}
      >
        <picture sx={sx.wrapper}>
          <img
            src={findImage(allMarbleIiifImage)}
            alt={label}
            title={label}
            sx={sx.image}
          />
          <ExpandIcon label={label} />
        </picture>
      </ViewerLink>
      <ItemAlternateViews
        allMarbleIiifImage={allMarbleIiifImage}
        marbleItem={marbleItem}
        location={location}
        viewer={viewer}
      />
    </section>
  )
}

ManifestImageGroup.propTypes = {
  allMarbleIiifImage: PropTypes.object,
  marbleItem: PropTypes.shape({
    childrenMarbleItem: PropTypes.array,
  }),
  location: PropTypes.object.isRequired,
  viewer: PropTypes.string,
}

ManifestImageGroup.defaultProps = {
  viewer: 'mirador',
}
export default ManifestImageGroup
