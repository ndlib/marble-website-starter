import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from '@ndlib/gatsby-theme-marble/src/components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Internal/Seo'
import IndexPage from 'components/Pages/IndexPage'

const Home = ({ data, location }) => {
  return (
    <Layout
      location={location}
    >
      <Seo
        data={data}
        location={location}
        title='Home'
      />
      <I18nextProvider i18n={i18next}>
        <IndexPage location={location} />
      </I18nextProvider>

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
