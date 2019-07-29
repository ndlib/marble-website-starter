import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import queryString from 'query-string'
import MiradorWrapper from './MiradorWrapper'

const MiradorViewerPage = ({ data, location }) => {
  const manifestId = typy(data, 'markdownRemark.frontmatter.iiifJson.id').safeString
  const qs = queryString.parse(location.search)
  const hideWindowTitle = qs.title === 'false'
  const sideBarOpenByDefault = qs.sidebar !== 'false'
  const thumbnailNavigationPosition = qs.thumbnails === 'true' ? 'far-bottom' : 'off'
  const fullscreen = qs.fullscreen !== 'false'
  const config = {
    id: 'test',
    window: {
      allowClose: false,
      allowFullscreen: fullscreen,
      allowMaximize: false,
      hideWindowTitle: hideWindowTitle,
      sideBarOpenByDefault: sideBarOpenByDefault,
    },
    responseHeaders: {
      'Content-Type': 'text/json',
    },
    windows: [
      {
        manifestId: manifestId,
        maximized: true,
        thumbnailNavigationPosition: thumbnailNavigationPosition,
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
