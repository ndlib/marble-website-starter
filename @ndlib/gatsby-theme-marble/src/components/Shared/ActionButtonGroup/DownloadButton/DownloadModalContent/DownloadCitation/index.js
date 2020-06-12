/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import typy from 'typy'

const DownloadCitation = ({ iiifManifest }) => {
  let biblio = ''
  const metadata = {}
  if (iiifManifest.type === 'Collection') {
    biblio = iiifManifest.label.en[0] + ', ' + iiifManifest.slug.replace('item/', '') + '. ' +
      iiifManifest.provider[0].homepage[0].label.en[0] + ', Hesburgh Libraries, University of Notre Dame, South Bend, IN. ' +
      window.location.href
  } else {
    if (typy(iiifManifest, 'provider[0].homepage[0]label.en[0]').isString) {
      iiifManifest.metadata.map((md) => {
        metadata[(md.label.en[0].trim())] = md.value.en[0]
      })
      if (iiifManifest.provider[0].homepage[0].label.en[0] === 'Snite Museum of Art') {
        biblio = metadata.Creator + ', ' + iiifManifest.label.en[0] + ', ' + metadata.Medium + '. ' +
        'Snite Museum of Art, University of Notre Dame. ' +
        metadata['Credit Line'] + ', ' + metadata['Accession number'] + '.'
      }
      if (iiifManifest.provider[0].homepage[0].label.en[0] === 'Rare Books and Special Collections' | 'University of Notre Dame Archives') {
        biblio = metadata.Creator + '. ' + iiifManifest.label.en[0] + ', ' + metadata.Date + '. ' +
        metadata.Collection + '. ' + iiifManifest.provider[0].homepage[0].label.en[0] + ', Hesburgh Libraries, University of Notre Dame, South Bend, IN.' +
        window.location.href
      }
    } else {
      biblio = 'Unable to render citation'
    }
  }
  return (
    <div sx={{}}>
      Bibliography Citation, Chicago Style 17th ed. We are making assumptions about
      the genre of these works and as result the citation may not fit your needs.
      Please verify for accuracy before including them in your work.
      <div className='citation'>{biblio}</div>
    </div>
  )
}

DownloadCitation.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default DownloadCitation
