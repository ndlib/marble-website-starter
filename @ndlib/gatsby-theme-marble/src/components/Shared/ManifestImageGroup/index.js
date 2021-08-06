/** @jsx jsx */
// eslint-disable complexity
import PropTypes from 'prop-types'
import ViewerLink from './ViewerLink'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'
import findImage from 'utils/findImage'
import { getFieldValue } from 'components/Shared/Seo/helpers.js'
import { jsx } from 'theme-ui'
import sx from './sx'

export const ManifestImageGroup = ({ location, marbleItem, allMarbleFile }) => {
  if (!marbleItem) {
    return null
  }
  const label = 'Open in external viewer application'
  const data = {
    marbleItem,
  }
  const classification = (getFieldValue(null, 'Classification', data).endsWith('s'))
    ? (getFieldValue(null, 'Classification', data)).slice(0, -1) : (getFieldValue(null, 'Classification', data))
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
            alt={(!marbleItem.description && (classification.length > 1))
              ? `This is a ${classification} called ${marbleItem.title}.`
              : (marbleItem.description ? marbleItem.description : label)}
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
    title: PropTypes.string,
  }),
  location: PropTypes.object.isRequired,
}
export default ManifestImageGroup
