import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import Layout from 'components/Layout'
import style from './style.module.css'

export const UniversalViewerLayout = ({ data, manifest }) => {
  const qs = queryString.parse(window.location.search).manifest
  if (!manifest && qs) {
    manifest = qs
  }
  if (!manifest) {
    return (<Layout>Not Found</Layout>)
  }
  return (
    <Layout noPadding>
      <h1 className='accessibilityOnly'>Universal Viewer</h1>
      <iframe
        allowFullScreen
        id='universalViewer'
        className={style.universalViewer}
        title='universal-viewer'
        sandbox='allow-same-origin allow-scripts allow-pointer-lock allow-popups'
        src={`${data.site.siteMetadata.universalViewerBaseURL}#?manifest=${manifest}`}
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
}

export default UniversalViewerLayout
