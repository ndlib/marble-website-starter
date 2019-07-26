import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import MiradorWrapper from './MiradorWrapper'

const MiradorViewerPage = ({ data, location }) => {
  const manifestId = typy(data, 'markdownRemark.frontmatter.iiifJson.id').safeString
  const config = {
    id: 'test',
    window: {
      allowClose: false,
      allowFullscreen: true,
      allowMaximize: false,
      sideBarOpenByDefault: true,
    },
    responseHeaders: {
      'Content-Type': 'text/json',
    },
    windows: [
      {
        manifestId: manifestId,
        maximized: true,
      },

    ],
    workspaceControlPanel: {
      enabled: false,
    },
  }
  return (
    <React.Fragment>
      {
        // seo stuff
      }
      <MiradorWrapper
        config={config}
        plugins={[]}
      />
    </React.Fragment>
  )
}

MiradorViewerPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default MiradorViewerPage
