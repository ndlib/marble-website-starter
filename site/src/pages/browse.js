import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import BrowsePage from 'components/Pages/BrowsePage'

const Browse = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo
        data={{}}
        location={location}
      />
      <I18nextProvider i18n={i18next}>
        <BrowsePage location={location} />
      </I18nextProvider>
    </Layout>
  )
}

Browse.propTypes = {
  location: PropTypes.object.isRequired,
}
export default Browse
