/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import sx from './sx'

const DownloadCitation = ({ iiifManifest }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `,
  )
  let biblio = ''
  const metadata = {}
  if (iiifManifest.type === 'Collection') {
    biblio = `${typy(iiifManifest, 'label.en[0]').safeString}, ${typy(iiifManifest, 'slug').safeString.replace('item/', '')}. ${typy(iiifManifest, 'provider[0].homepage[0].label.en[0]').safeString}, Hesburgh Libraries, University of Notre Dame, South Bend, IN. ${typy(site, 'siteMetadata.siteUrl').safeString}/${typy(iiifManifest, 'slug').safeString}`
  } else if (typy(iiifManifest, 'provider[0].homepage[0]label.en[0]').isString) {
    iiifManifest.metadata.map((md) => {
      metadata[(md.label.en[0].trim())] = md.value.en[0]
      return metadata
    })
    if (typy(iiifManifest, 'provider[0].homepage[0].label.en[0]').safeString === 'Snite Museum of Art') {
      biblio = `${typy(metadata, 'Creator').safeString}, ${typy(iiifManifest, 'label.en[0]').safeString}, ${typy(metadata, 'Medium').safeString}. Snite Museum of Art, University of Notre Dame. ${typy(metadata, 'Credit Line').safeString}, ${typy(metadata, 'Accession number').safeString}.`
    }
    if (typy(iiifManifest, 'provider[0].homepage[0].label.en[0]').safeString === 'Rare Books and Special Collections' | 'University of Notre Dame Archives') {
      biblio = `${typy(metadata, 'Creator').safeString}. ${typy(iiifManifest, 'label.en[0]').safeString}, ${typy(metadata, 'Date').safeString}. ${typy(metadata, 'Collection').safeString}. ${typy(iiifManifest, 'provider[0].homepage[0].label.en[0]').safeString}, Hesburgh Libraries, University of Notre Dame, South Bend, IN. ${typy(site, 'siteMetadata.siteUrl').safeString}/${typy(iiifManifest, 'slug').safeString}`
    }
  }
  if (biblio === '') {
    return null
  } else {
    return (
      <div>
        Bibliography Citation, Chicago Style 17th ed. We are making assumptions about
        the genre of these works and as result the citation may not fit your needs.
        Please verify for accuracy before including them in your work.
        <div className='citation' sx={sx.citation}>{biblio}</div>
      </div>
    )
  }
}

DownloadCitation.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default DownloadCitation
