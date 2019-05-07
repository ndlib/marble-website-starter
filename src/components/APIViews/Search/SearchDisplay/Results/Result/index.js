import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import MetaDataList from 'components/Shared/MetaDataList'
import Card from 'components/Shared/Card'
const md5 = require('md5')

const Result = ({ doc, location }) => {
  const metadata = buildMetadata(doc)
  const url = buildUrl(doc)
  const image = imageFromDoc(doc)
  return (
    <Card
      label={doc.pnx.display.title[0]}
      image={image}
      target={url}
      location={location}
      referal={{ type: 'search', query: location.search }}
    >
      <MetaDataList metadata={metadata} />
      <div className='description'>{doc.description}</div>
    </Card>
  )
}

Result.propTypes = {
  doc: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Result

// Normalization functions to convert data from PRIMO
export const buildUrl = (doc) => {
  let subset = null

  if (typy(doc, 'pnx.control.sourcerecordid').isArray) {
    const slug = md5(`https:${doc.pnx.control.sourcerecordid[0]}`)
    if (doc.pnx.control.sourcerecordid[0].endsWith('manifest')) {
      subset = '/item/' + slug
    } else {
      subset = '/collection/' + slug
    }
  }
  return subset
}

export const buildMetadata = (doc) => {
  const desiredData = dataMap()
  const metadata = desiredData.map(data => {
    if (typy(doc, data.docField).isString) {
      return { label: data.label, value: typy(doc, data.docField).safeString }
    }
    return null
  }).filter(data => data)
  return metadata
}

export const imageFromDoc = (doc) => {
  let link = {}
  if (typy(doc, 'delivery.link').isArray) {
    link = doc.delivery.link.find(
      (l) => {
        return l.linkType === 'http://purl.org/pnx/linkType/thumbnail'
      }
    ) || {}
  }

  if (!link.linkURL) {
    link.linkURL = ''
  }
  return link.linkURL
}

// TODO: Move this to an external configuration file
export const dataMap = () => {
  return [
    {
      label: 'Creator',
      docField: 'pnx.display.creator[0]',
    },
    {
      label: 'Date',
      docField: 'pnx.display.creationdate[0]',
    },
    {
      label: 'Format',
      docField: 'pnx.display.format[0]',
    },
    {
      label: 'Repository',
      docField: 'pnx.control.sourceid[0]',
    },
    {
      label: 'Collection',
      docField: 'delivery.holding[0].subLocation',
    },
  ]
}
