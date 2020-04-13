/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import { jsx } from 'theme-ui'
import Card from 'components/Shared/Card'
import TypeLabel from './TypeLabel'
import { getImageServiceFromThumbnail } from 'utils/getImageService'
import getLanguage from 'utils/getLanguage'
import sx from './sx'

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
  `,
  )

  const manifestId = typy(props, 'iiifManifest').isString ? props.iiifManifest : props.iiifManifest.id
  const imageRegion = typy(props, 'imageRegion').isString ? props.imageRegion : 'full'

  const iiifManifest = findManifest(manifestId, allIiifJson)
  if (!iiifManifest) {
    console.warn('Could not find manifest: ', manifestId)
    return null
  }
  const imageService = getImageServiceFromThumbnail(iiifManifest)
  const lang = getLanguage()
  const creator = findCreator(iiifManifest, lang)
  const dates = findDates(iiifManifest, lang)

  // let children = (
  //   <div>{typy(iiifManifest, `summary[${lang}][0]`).safeString}</div>
  // )
  //
  // if (props.children) {
  //   children = props.children
  // }

  return (
    <div sx={sx.wrapper}>
      <Card
        label={iiifManifest.label[lang][0]}
        target={`/${iiifManifest.slug}`}
        imageService={imageService || null}
        imageRegion={imageRegion}
        {...props}
      >
        <p sx={sx.lineStyle}>{creator}</p>
        <p sx={sx.lineStyle}>{dates}</p>
        { /* children */ }
      </Card>
      <TypeLabel iiifManifest={iiifManifest} />
    </div>
  )
}

const findCreator = (manifest, lang) => {
  const options = ['creator']
  if (!manifest.metadata) {
    return []
  }

  return manifest.metadata.reduce((creator, row) => {
    const label = row.label[lang].join('').toLowerCase()

    if (options.includes(label)) {
      return creator.concat(row.value[lang].join(''))
    }

    return creator
  }, [])
}

const findDates = (manifest, lang) => {
  const options = ['date', 'dates']
  if (!manifest.metadata) {
    return []
  }

  return manifest.metadata.reduce((dates, row) => {
    const label = row.label[lang].join('').toLowerCase().trim()
    if (options.includes(label)) {
      return dates.concat(row.value[lang].join(''))
    }

    return dates
  }, [])
}

const findManifest = (manifestId, allIiifJson) => {
  return allIiifJson.nodes.find(manifest => {
    return manifest.id === manifestId
  })
}

ManifestCard.propTypes = {
  iiifManifest: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  imageRegion: PropTypes.string,
}

export default ManifestCard
