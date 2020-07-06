/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import { jsx } from 'theme-ui'
import Card from 'components/Shared/Card'
import TypeLabel from './TypeLabel'
// import { getImageServiceFromThumbnail } from 'utils/getImageService'
// import getLanguage from 'utils/getLanguage'
import sx from './sx'

export const ManifestCard = (props) => {
  console.log(props.iiifManifest)
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
          image {
            thumbnail
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
  const children = figureOutChildren(props, item)

  // TODO Fix image path for collections
  return (
    <div sx={sx.wrapper}>
      <Card
        label={item.title}
        target={`/${item.slug}`}
        imageService={typy(item, 'image.thumbnail').safeString}
        imageRegion='full'
        {...props}
      >
        {children}
      </Card>
      <TypeLabel type={item.display} />
    </div>
  )
}

const findMetadata = (manifest, options) => {
  if (!manifest.metadata) {
    return []
  }

  return manifest.metadata.reduce((metaValue, row) => {
    const label = row.label.toLowerCase()

    if (options.includes(label)) {
      return metaValue.concat(row.value.join('<br/>'))
    }

    return metaValue
  }, [])
}

export const figureOutChildren = (parentProps, item) => {
  const creator = findMetadata(item, ['creator'])
  const dates = findMetadata(item, ['date', 'dates'])
  return (
    <React.Fragment>
      {
        parentProps.showCreator ? (
          <p
            sx={sx.lineStyle}
            dangerouslySetInnerHTML={{ __html: creator }}
          />
        ) : null
      }
      {
        parentProps.showDate ? (
          <p
            sx={sx.lineStyle}
            dangerouslySetInnerHTML={{ __html: dates }}
          />
        ) : null
      }
      {parentProps.showSummary ? <div>{typy(item, 'description').safeString}</div> : null}
      {parentProps.children ? parentProps.children : null}
    </React.Fragment>
  )
}

const findItem = (manifestId, allMarbleItem) => {
  return allMarbleItem.nodes.find(item => {
    return item.iiifUri === manifestId
  })
}

ManifestCard.propTypes = {
  iiifManifest: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  imageRegion: PropTypes.string,
  showCreator: PropTypes.bool,
  showDate: PropTypes.bool,
  showSummary: PropTypes.bool,
  children: PropTypes.node,
}
ManifestCard.defaultProps = {
  showCreator: true,
  showDate: true,
  showSummary: false,
}
export default ManifestCard
