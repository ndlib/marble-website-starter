import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'
import Navigation from 'components/Shared/Navigation'
import KmlMap from 'components/Map/Kml'

// import { ReactiveBase, DataSearch, MultiList, SingleDataList, ReactiveList, DynamicRangeSlider, MultiDropdownList, MultiDataList, SelectedFilters } from '@appbaseio/reactivesearch'
// import Card from 'components/Shared/Card'
// import ResponsiveGridList from 'components/Shared/ResponsiveGridList'

export const MarkdownTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const navigation = (post.frontmatter.menu ? <Navigation id={post.frontmatter.menu} /> : null)
  // const category = (post.frontmatter.category ? <Navigation id={post.frontmatter.menu} /> : null)
  return (
    <Layout
      title={post.frontmatter.title}
      nav={navigation}
      preMain={<SEO title={post.frontmatter.title} pathname={location.pathname} />}
      location={location}
    >
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <KmlMap map={post.frontmatter.map} />
    </Layout>
  )
}

MarkdownTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default MarkdownTemplate

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
        menu
        map {
          kmlFile
          defaultZoom
          center {
            lat
            lng
          }
        }
      }
    }
  }
`
