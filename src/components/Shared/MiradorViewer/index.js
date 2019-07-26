import React from 'react'
import PropTypes from 'prop-types'
import MiradorViewerPage from 'components/MiradorViewerPage'
import pageLinkFromManifest from 'utils/pageLinkFromManifest.js'

const MiradorViewer = ({ iiifManifest, height, width }) => {
  const style = {
    border: 'none',
    height: height,
    margin: '0',
    overflow: 'hidden',
    width: width,
  }
  return (
    <iframe
      allowFullScreen
      id='miradorViewer'
      className='miradorViewer'
      title='mirador-viewer'
      sandbox='allow-same-origin allow-scripts allow-pointer-lock allow-popups'
      scrolling='no'
      style={style}
      src={`${pageLinkFromManifest(iiifManifest)}/mirador`}
    />
  )
}
MiradorViewer.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
}

MiradorViewer.defaultProps = {
  height: '600px',
  width: '100%',
}
export default MiradorViewer
