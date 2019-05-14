import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import Layout from 'components/Layout'
import PrivateRoute from 'components/Layout/PrivateRoute/'
import SkipToMain from 'components/Layout/PageWrapper/SkipToMain'
import SEO from 'components/Shared/Seo'
import style from './style.module.css'

export const UniversalViewerLayout = ({ data, manifest, location, requireLogin }) => {
  const qs = queryString.parse(location.search)
  if (!manifest && qs) {
    manifest = qs.manifest
  }
  if (!manifest) {
    return (<Layout location={location}>Not Found</Layout>)
  }
  const cv = qs.cv || 0
  return (
    <PrivateRoute
      location={location}
      requireLogin={requireLogin}
    >
      <SkipToMain />
      <SEO title={`Universal Viewer`} />
      <h1 className='accessibilityOnly'>Universal Viewer</h1>
      <main id='mainContent'>
        <iframe
          allowFullScreen
          id='universalViewer'
          className={style.universalViewer}
          title='universal-viewer'
          sandbox='allow-same-origin allow-scripts allow-pointer-lock allow-popups'
          src={`${data.site.siteMetadata.universalViewerBaseURL}#?manifest=${manifest}&cv=${cv}`}
        />
      </main>
    </PrivateRoute>
  )
}

UniversalViewerLayout.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        universalViewerBaseURL: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  manifest: PropTypes.string,
  location: PropTypes.object.isRequired,
  requireLogin: PropTypes.bool.isRequired,
}

export default UniversalViewerLayout
