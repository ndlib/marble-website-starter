/** @jsx jsx */
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import ViewerLink from './ViewerLink'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'
import findImage from 'utils/findImage'
import { jsx } from 'theme-ui'
import sx from './sx'

export const ManifestImageGroup = ({ location, marbleItem, viewer }) => {
  const { allFile } = useStaticQuery(
    graphql`
    query {
      allFile(filter: {extension: {eq: "jpg"}}) {
        nodes {
          name
          publicURL
          childImageSharp {
            fixed(width: 125, height: 125) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  `,
  )
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
            src={findImage(marbleItem, allFile)}
            alt={label}
            title={label}
            sx={sx.image}
          />
          <ExpandIcon label={label} />
        </picture>
      </ViewerLink>
      <ItemAlternateViews
        allFile={allFile}
        marbleItem={marbleItem}
        location={location}
        viewer={viewer}
      />
    </section>
  )
}

ManifestImageGroup.propTypes = {
  marbleItem: PropTypes.shape({
    childrenMarbleIiifImage: PropTypes.arrayOf(
      PropTypes.shape({
        default: PropTypes.string,
      }),
    ),
  }),
  location: PropTypes.object.isRequired,
  viewer: PropTypes.string,
}

ManifestImageGroup.defaultProps = {
  viewer: 'mirador',
}
export default ManifestImageGroup
