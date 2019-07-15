import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Shared/Seo'
import Navigation from 'components/Shared/Navigation'
import KmlMap from 'components/Map/Kml'
import SearchBanner from './SearchBanner'
import MarkdownCardGroups from './MarkdownCardGroups'
import ImageSection from 'components/ManifestViews/Item/ItemAside/ImageSection'
import style from './style.module.css'

const Markdown = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark
  const seoTitle = frontmatter.title || data.site.siteMetadata.title
  const navigation = (frontmatter.menu ? <Navigation id={frontmatter.menu} /> : null)
  const iiifManifest = frontmatter.iiifJson
  return (
    <Layout
      title={frontmatter.title}
      nav={navigation}
      location={location}
      preMain={
        <React.Fragment>
          <Seo
            title={seoTitle}
            pathname={location.pathname}
          />
          <SearchBanner frontmatter={frontmatter} location={location} />
        </React.Fragment>
      }
    >
      <div
        className={style.bodyText}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ImageSection iiifManifest={iiifManifest} location={location} />
      <MarkdownCardGroups frontmatter={frontmatter} />
      <KmlMap map={frontmatter.map} />
    </Layout>
  )
}

Markdown.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default Markdown
