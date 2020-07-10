import React from 'react'
import PropTypes from 'prop-types'
const DownloadCitation = ({ marbleItem }) => {
  return marbleItem.citation ? <div>{marbleItem.citation}</div> : null
}
export default DownloadCitation

DownloadCitation.propTypes = {
  marbleItem: {
    citation: PropTypes.string,
  },
}
