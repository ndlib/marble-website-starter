/** @jsx jsx */
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import { jsx } from 'theme-ui'
import Card from 'components/Shared/Card'
import TypeLabel from './TypeLabel'
import ManifestCardChildren from './ManifestCardChildren'
import sx from './sx'
import noImage from 'assets/images/noImage.svg'

export const ManifestCard = (props) => {
  const { allMarbleItem } = useStaticQuery(
    graphql`
    query {
      allMarbleItem {
        nodes {
          id
          marbleId
          slug
          title
          iiifUri
          display
          childrenMarbleIiifImage {
            service
            local {
              publicURL
              childImageSharp {
                fluid(maxHeight: 250) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          metadata {
            label
            value
          }
        }
      }
    }
  `,
  )
  const item = findItem(props.iiifManifest, allMarbleItem)
  if (!item) {
    console.warn('Could not find manifest: ', props.iiifManifest)
    return null
  }

  const gatsbyImage = findGatsbyImage(item)
  let title = ''
  if (props.highlight && props.highlight['name.folded']) {
    title = props.highlight['name.folded'][0]
  } else {
    title = item.title
  }
  return (
    <div sx={sx.wrapper}>
      <Card
        label={title}
        target={`/${item.slug}`}
        image={gatsbyImage}
        {...props}
      >
        <ManifestCardChildren
          item={item}
          parentProps={props}
        />
      </Card>
      <TypeLabel type={item.display} />
    </div>
  )
}

const findItem = (manifestId, allMarbleItem) => {
  return allMarbleItem.nodes.find(item => {
    return item.marbleId === manifestId || item.iiifUri === manifestId
  })
}

const findGatsbyImage = (item) => {
  return typy(item, 'childrenMarbleIiifImage[0].local.childImageSharp.fluid.src').safeString ||
  `${typy(item, 'childrenMarbleIiifImage[0].service').safeString}/full/!250,250/0/default.jpg` ||
  noImage
}

ManifestCard.propTypes = {
  iiifManifest: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  imageRegion: PropTypes.string,
  showCreator: PropTypes.bool,
  showDate: PropTypes.bool,
  showSummary: PropTypes.bool,
  children: PropTypes.node,
  highlight: PropTypes.object,
}
ManifestCard.defaultProps = {
  showCreator: true,
  showDate: true,
  showSummary: false,
}
export default ManifestCard
