/** @jsx jsx */
import PropTypes from 'prop-types'
import ViewerLink from './ViewerLink'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'
import findImage from 'utils/findImage'
import { jsx } from 'theme-ui'
import sx from './sx'

export const ManifestImageGroup = ({ location, marbleItem, allMarbleFile }) => {
  if (!marbleItem) {
    return null
  }
  const label = process.env.IIIF_VIEWER_URL ? 'Open in external viewer application' : marbleItem.title
  return (
    <section>
      <h2 className='accessibilityOnly'>Images</h2>
      <ViewerLink
        marbleItem={marbleItem}
        location={location}
      >
        <picture sx={sx.wrapper}>
          <img
            src={findImage(allMarbleFile, marbleItem)}
            alt={label}
            title={label}
            sx={sx.image}
          />
          <ExpandIcon label={label} />
        </picture>
      </ViewerLink>
      <ItemAlternateViews
        allMarbleFile={allMarbleFile}
        marbleItem={marbleItem}
        location={location}
      />
    </section>
  )
}

ManifestImageGroup.propTypes = {
  allMarbleFile: PropTypes.object,
  marbleItem: PropTypes.shape({
    childrenMarbleItem: PropTypes.array,
  }),
  location: PropTypes.object.isRequired,
}
export default ManifestImageGroup
