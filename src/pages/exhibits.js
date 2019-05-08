import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import SEO from 'components/Shared/Seo'
import Card from 'components/Shared/Card'

export const ExhibitsPage = ({ data }) => {
  const exhibitions = data.site.siteMetadata.exhibitions
  return (
    <Layout>
      <SEO title='Digital Exhibits' />
      <h1>Exhibits</h1>
      <main>
        {
          exhibitions.map(exhibit => {
            return (
              <Card
                key={exhibit.id}
                label={exhibit.label}
                target={exhibit.link}
                image={exhibit.image}
              />
            )
          })
        }
      </main>
    </Layout>
  )
}

export default ExhibitsPage

ExhibitsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        exhibitions {
          id
          label
          image
          link
        }
      }
    }
  }
`
