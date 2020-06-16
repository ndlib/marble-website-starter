import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import AboutPage from 'components/Pages/AboutPage'

const About = ({ location }) => {
  return (
    <Layout
      title='Introduction'
      location={location}
    >
      <Seo
        data={{}}
        location={location}
      />
      <I18nextProvider i18n={i18next}>
        <AboutPage />
      </I18nextProvider>
    </Layout>

  )
}

About.propTypes = {
  location: PropTypes.object.isRequired,
}
export default About
