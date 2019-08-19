import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import Card from 'components/Shared/Card'
import { getImageServiceFromThumbnail } from 'utils/getImageService'
import getLanguage from 'utils/getLanguage'

export const ManifestCardInternal = (props) => {
  const manifestId = typy(props, 'iiifManifest').isString ? props.iiifManifest : props.iiifManifest.id

  const iiifEdge = props.allManifests.find(manifest => {
    return manifest.node.id === manifestId
  })
  const iiifManifest = typy(iiifEdge, 'node').safeObject || null
  if (!iiifManifest) {
    console.warn('Could not find manifest: ', manifestId)
    return null
  }
  const imageService = getImageServiceFromThumbnail(iiifManifest)
  const lang = getLanguage()

  return (
    <Card
      label={iiifManifest.label[lang][0]}
      target={`/${iiifManifest.slug}`}
      imageService={imageService || null}
      {...props}
    >
      <div>{iiifManifest.description}</div>
    </Card>
  )
}

ManifestCardInternal.propTypes = {
  allManifests: PropTypes.array.isRequired,
  iiifManifest: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

export const ManifestCard = (props) => {
  return (
    <StaticQuery
      query={graphql`
      query {
        allIiifJson {
          edges {
            node {
              ...iiifJsonFragment
            }
          }
        }
      }
    `}
      render={data => <ManifestCardInternal allManifests={data.allIiifJson.edges} {...props} />}
    />
  )
}

ManifestCard.propTypes = {
  iiifManifest: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

export default ManifestCard
