import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import Layout from 'components/Layout'
import PrivateRoute from 'components/Layout/PrivateRoute/'
import SkipToMain from 'components/Layout/PageWrapper/SkipToMain'
import Seo from 'components/Internal/Seo'
import BackToItem from './BackToItem'
import style from './style.module.css'

export const UniversalViewer = ({ data, manifest, location, requireLogin }) => {
  const qs = queryString.parse(location.search)
  if (!manifest && qs) {
    manifest = qs.manifest
  }
  if (!manifest) {
    return (<Layout location={location}>The requested manifest could not be found.</Layout>)
  }
  const cv = qs.cv || 0
  return (
    <PrivateRoute
      location={location}
      requireLogin={requireLogin}
    >
      <SkipToMain />
      <Seo
        data={data}
        location={location}
        title={`Universal Viewer`}
        description={`Universal Viewer viewing ${manifest}.`}
      />
      <h1 className='accessibilityOnly'>{manifest} - {cv} - Universal Viewer</h1>
      <main id='mainContent'>
        <BackToItem location={location} />
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

UniversalViewer.propTypes = {
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

UniversalViewer.defaultProps = {
  requireLogin: false,
}
export default UniversalViewer

// Remove cv query parameter from cannonical link but still include the manifest
// const UVCanonicalPath = (qs) => {
//   delete qs.cv
//   return `/viewer/?${queryString.stringify(qs)}`
// }
