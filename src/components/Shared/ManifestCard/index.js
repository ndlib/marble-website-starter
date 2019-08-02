import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import Card from 'components/Shared/Card'
import { getImageServiceFromThumbnail } from 'utils/getImageService'

export const ManifestCardInternal = (props) => {
  const manifestId = typy(props, 'iiifManifest').isString ? props.iiifManifest : props.iiifManifest.id
  const iiifManifest = props.allManifests.find(manifest => {
    return manifest.node.id === manifestId
  }).node

  const imageService = getImageServiceFromThumbnail(iiifManifest)
  return (
    <Card
      label={iiifManifest.label.en[0]}
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
              id
              type
              slug
              label {
                en
              }
              thumbnail {
                id
                service {
                  id
                }
              }
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
