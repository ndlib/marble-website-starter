import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'
import style from './style.module.css'

export const UniversalViewerLayout = ({ data, manifest, location }) => {
  const qs = queryString.parse(location.search)
  if (!manifest && qs) {
    manifest = qs.manifest
  }
  if (!manifest) {
    return (<Layout>Not Found</Layout>)
  }
  const cv = qs.cv || 0
  return (
    <Layout
      noPadding
      preMain={<SEO title={`Universal Viewer`} />}
    >
      <h1 className='accessibilityOnly'>Universal Viewer</h1>
      <iframe
        allowFullScreen
        id='universalViewer'
        className={style.universalViewer}
        title='universal-viewer'
        sandbox='allow-same-origin allow-scripts allow-pointer-lock allow-popups'
        src={`${data.site.siteMetadata.universalViewerBaseURL}#?manifest=${manifest}&cv=${cv}`}
      />
    </Layout>
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
}

export default UniversalViewerLayout
