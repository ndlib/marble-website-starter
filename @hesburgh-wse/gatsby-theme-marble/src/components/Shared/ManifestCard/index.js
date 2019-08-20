import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import Card from 'components/Shared/Card'
import { getImageServiceFromThumbnail } from 'utils/getImageService'
import getLanguage from 'utils/getLanguage'

export const ManifestCard = (props) => {
  const { allIiifJson } = useStaticQuery(
    graphql`
    query {
      allIiifJson {
        nodes {
          ...iiifJsonFragment
        }
      }
    }
  `
  )
  const manifestId = typy(props, 'iiifManifest').isString ? props.iiifManifest : props.iiifManifest.id
  const iiifNode = allIiifJson.nodes.find(manifest => {
    return manifest.id === manifestId
  })
  const iiifManifest = iiifNode || null
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

ManifestCard.propTypes = {
  iiifManifest: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

export default ManifestCard
