/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import { jsx } from 'theme-ui'
import Card from 'components/Shared/Card'
import TypeLabel from './TypeLabel'
import sx from './sx'

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
  let title = ''
  if (props.highlight && props.highlight.name) {
    title = props.highlight.name[0]
  } else {
    title = item.title
  }
  // TODO Fix image path for collections
  return (
    <div sx={sx.wrapper}>
      <Card
        label={title}
        target={`/${item.slug}`}
        imageService={typy(item, 'childrenMarbleIiifImage[0].service').safeString}
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
    const label = typy(row, 'label').safeString.toLowerCase()

    if (options.includes(label)) {
      return metaValue.concat(row.value.join('<br/>'))
    }

    return metaValue
  }, [])
}

export const figureOutChildren = (parentProps, item) => {
  const dates = findMetadata(item, ['date', 'dates'])
  let creator = ''
  if (parentProps.highlight && parentProps.highlight.creator) {
    creator = parentProps.highlight.creator[0]
  } else {
    creator = findMetadata(item, ['creator'])
  }
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
      {parentProps.showSummary ? <div>{item.description}</div> : null}
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
  highlight: PropTypes.object,
}
ManifestCard.defaultProps = {
  showCreator: true,
  showDate: true,
  showSummary: false,
}
export default ManifestCard
