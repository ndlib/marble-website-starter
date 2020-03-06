import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import Link from 'components/Internal/Link'
import miradorIcon from 'assets/icons/svg/mirador-24px.svg'

export const AllPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}) => {
  const posts = (type) => edges
    // eslint-disable-next-line complexity
    .filter(edge => {
      // You can filter your posts based on some criteria
      switch (type) {
        case 'item':
          return !!edge.node.frontmatter.slug.match(/item\//)
        case 'collection':
          return !!edge.node.frontmatter.slug.match(/collection\//)
        case 'browse':
          return !!edge.node.frontmatter.slug.match(/browse/)
        default:
          return !edge.node.frontmatter.slug.match(/item\//) && !edge.node.frontmatter.slug.match(/collection\//) &&
          !edge.node.frontmatter.slug.match(/browse/) &&
            !edge.node.frontmatter.slug.match(/404.html/) && edge.node.frontmatter.title
      }
    })
    .sort((a, b) => {
      const cleanA = a.node.frontmatter.title.replace('"', '')
      const cleanB = b.node.frontmatter.title.replace('"', '')
      if (cleanA < cleanB) {
        return -1
      }
      if (cleanA > cleanB) {
        return 1
      }
      return 0
    })
    .map(edge => {
      return (
        <li key={edge.node.id}>
          <Link to={edge.node.frontmatter.slug} >{edge.node.frontmatter.title}</Link>
          {
            edge.node.frontmatter.slug.match(/item\//) ? (
              <React.Fragment>
                <span>&nbsp;</span>
                <Link to={`${edge.node.frontmatter.slug}/mirador`} >
                  <img
                    src={miradorIcon}
                    alt='Open in Mirador'
                    style={{
                      height: '16px',
                      width: '16px',
                      verticalAlign: 'text-bottom',
                    }}
                  />
                </Link>
              </React.Fragment>
            ) : null
          }
        </li>
      )
    })

  return (
    <Layout
      title='Sitemap'
      location={location}
    >
      <Seo
        data={{}}
        location={location}
      />
      <h2>Collections</h2>
      <ul>{posts('collection')}</ul>
      <h2>Items</h2>
      <ul>{posts('item')}</ul>
      <h2>Browse Pages</h2>
      <ul>{posts('browse')}</ul>
      <h2>Other Content</h2>
      <ul>{posts()}</ul>
    </Layout>
  )
}

AllPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export default AllPage
export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`
