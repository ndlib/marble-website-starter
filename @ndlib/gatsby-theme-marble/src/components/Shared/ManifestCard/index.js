/** @jsx jsx */
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import { jsx } from 'theme-ui'
import Card from 'components/Shared/Card'
import TypeLabel from './TypeLabel'
import ManifestCardChildren from './ManifestCardChildren'
import sx from './sx'

export const ManifestCard = (props) => {
  const { allMarbleItem, allFile } = useStaticQuery(
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
            name
          }
          metadata {
            label
            value
          }
        }
      }
      allFile(filter: {extension: {eq: "jpg"}}) {
        nodes {
          name
          publicURL
          childImageSharp {
            fluid(maxHeight: 250) {
              ...GatsbyImageSharpFluid
            }
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

  const gatsbyImage = findGatsbyImage(item, allFile)
  let title = ''
  if (props.highlight && props.highlight.name) {
    title = props.highlight.name[0]
  } else {
    title = item.title
  }
  return (
    <div sx={sx.wrapper}>
      <Card
        label={title}
        target={`/${item.slug}`}
        image={typy(gatsbyImage, 'src').safeString}
        imageService={typy(item, 'childrenMarbleIiifImage[0].service').safeString}
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
    return item.iiifUri === manifestId
  })
}

const findGatsbyImage = (item, allFile) => {
  if (!typy(item, 'childrenMarbleIiifImage[0].name').isString) {
    return null
  }
  const result = allFile.nodes.find(file => {
    return file.name.includes(typy(item, 'childrenMarbleIiifImage[0].name').safeString)
  })
  return typy(result, 'childImageSharp.fluid').safeObject
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
