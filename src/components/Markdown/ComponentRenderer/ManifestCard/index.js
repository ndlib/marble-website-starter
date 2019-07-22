import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import Card from 'components/Shared/Card'
import { getImageServiceFromThumbnail } from 'utils/getImageService'

export const ManifestCard = (props) => {
  const iiifManifest = typy(props, 'iiifManifest').isObject ? props.iiifManifest : props.allManifests.find(manifest => {
    return manifest.node['_id'] === props.iiifManifest
  }).node
  const imageService = getImageServiceFromThumbnail(iiifManifest)
  return (
    <Card
      label={iiifManifest.label}
      target={iiifManifest._id}
      imageService={imageService || null}
      {...props}
    >
      <div>{iiifManifest.description}</div>
    </Card>
  )
}

ManifestCard.propTypes = {
  allManifests: PropTypes.array.isRequired,
  iiifManifest: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
}

export const ManifestCardWrapper = (props) => {
  return (
    <StaticQuery
      query={graphql`
      query {
        allIiifJson {
          edges {
            node {
              _id
              label
              thumbnail {
                _id
                service {
                  _id
                }
              }
            }
          }
        }
      }
    `}
      render={data => <ManifestCard allManifests={data.allIiifJson.edges} {...props} />}
    />
  )
}

ManifestCardWrapper.propTypes = {
  iiifManifest: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
}

export default ManifestCardWrapper
