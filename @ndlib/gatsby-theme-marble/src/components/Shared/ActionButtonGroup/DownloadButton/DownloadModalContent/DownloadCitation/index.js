/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const DownloadCitation = ({ iiifManifest }) => {
  return (
    <div sx={{}}>Citation for <code>{iiifManifest.slug}</code> TBD.</div>
  )
}

DownloadCitation.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default DownloadCitation
