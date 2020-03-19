import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import typy from 'typy'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import IndexPage from 'components/Pages/IndexPage'

const Home = ({ data, location }) => {
  const title = typy(data, 'remarkMarblePage.frontmatter.title').safeString || null

  return (
    <Layout
      title={title}
      location={location}
    >
      <Seo
        data={data}
        location={location}
      />
      <IndexPage location={location} />
    </Layout>
  )
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default Home

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        searchBase {
          app
          url
        }
      }
    }
  }
`
