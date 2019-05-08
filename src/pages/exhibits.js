import React from 'react'
import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import SEO from 'components//Shared/Seo'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import Card from 'components/Shared/Card'

export const ExhibitsPage = ({ data }) => {
  const exhibitions = data.site.siteMetadata.exhibitions
  return (
    <Layout
      title='Exhibits'
      preMain={
        <SEO title='Digital Exhibits' />
      }
    >
      <ResponsiveGridList>
        {
          exhibitions.map((exhibit, index) => {
            return (
              <div key={`${index}`}>
                <Card
                  key={exhibit.id}
                  label={exhibit.label}
                  target={exhibit.link}
                  image={exhibit.image}
                />
              </div>
            )
          })
        }
      </ResponsiveGridList>
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
