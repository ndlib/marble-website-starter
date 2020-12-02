import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import ExhibitsPage from 'components/Pages/ExhibitsPage'

const Exhibits = ({ location }) => {
  return (
    <Layout
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title='Digital Exhibits'
      />
      <I18nextProvider i18n={i18next}>
        <ExhibitsPage />
      </I18nextProvider>
    </Layout>
  )
}

Exhibits.propTypes = {
  location: PropTypes.object.isRequired,
}
export default Exhibits
