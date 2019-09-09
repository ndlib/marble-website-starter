import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import Card from 'components/Shared/Card'
import TypeLabel from './TypeLabel'
import { getImageServiceFromThumbnail } from 'utils/getImageService'
import getLanguage from 'utils/getLanguage'
import style from './style.module.css'

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
  console.log(iiifManifest.type)
  return (
    <div className={style.manifestCardWrapper}>
      <Card
        label={iiifManifest.label[lang][0]}
        target={`/${iiifManifest.slug}`}
        imageService={imageService || null}
        {...props}
      >
        <div>{iiifManifest.description}</div>
      </Card>
      <TypeLabel iiifManifest={iiifManifest} />
    </div>
  )
}

ManifestCard.propTypes = {
  iiifManifest: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

export default ManifestCard
