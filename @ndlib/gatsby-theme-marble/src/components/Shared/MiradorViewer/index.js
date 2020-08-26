import React, { useState } from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
const MiradorViewer = ({ iiifManifest, height, width }) => {
  const [viewerBlocked, toggleBlocking] = useState(true)
  const viewerDimensions = {
    height: height,
    width: width,
  }
  return (
    <div className={style.viewerWrapper}>
      <iframe
        allowFullScreen
        id='miradorViewer'
        className='miradorViewer'
        title='mirador-viewer'
        sandbox='allow-same-origin allow-scripts allow-pointer-lock allow-popups'
        scrolling='no'
        style={viewerDimensions}
        src={`/${iiifManifest.slug}/mirador?title=false&thumbnails=true&sidebar=false&fullscreen=false`}
      />
      <div
        className={viewerBlocked ? style.blocking : style.notBlocking}
        style={{
          height: viewerDimensions.height,
          width: viewerDimensions.width,
        }}
      />
      <button
        className={style.toggleButton}
        onClick={() => {
          toggleBlocking(!viewerBlocked)
        }}
      >{
          viewerBlocked ? 'Click to enable interactive viewer' : 'Click to disable interactive viewer'
        }
      </button>
    </div>
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
