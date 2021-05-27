import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

const ViewerContent = ({ marbleItem, index, view, viewerUrl }) => {
  const { type, target } = viewerSettings(marbleItem, index, view, viewerUrl)
  const style = {
    border: 'none',
    height: 'calc(100vh - 89px - 3rem)',
    width: '100%',
    position: 'absolute',
    left: '0',
    top: '57px',
    overflow: 'hidden',
  }
  switch (type) {
    case 'pdf':
      return (
        <embed
          src={target}
          type='application/pdf'
          style={style}
        />
      )
    case 'iiif':
    default:
      return (
        <iframe
          allowFullScreen
          title='IIIF Viewer'
          src={target}
          style={style}
        />
      )
  }
}

ViewerContent.propTypes = {
  marbleItem: PropTypes.object.isRequired,
  view: PropTypes.string,
  index: PropTypes.number,
  viewerUrl: PropTypes.string
}
export default ViewerContent

const viewerSettings = (marbleItem, index, view, viewerUrl) => {
  const pdfs = typy(marbleItem, 'childrenMarbleFile').safeArray.filter(f => {
    return f.fileType === 'pdf'
  })

  if (!!pdfs && pdfs.length > 0) {
    return {
      type:'pdf',
      target: typy(pdfs, '[0].file').safeString,
    }
  }

  return {
    type: 'iiif',
    target: `${viewerUrl}${marbleItem.iiifUri}&cv=${index}&view=${view}&title=false`,
  }
}
