import React from 'react'
import PropTypes from 'prop-types'
// import { I18nextProvider } from 'react-i18next'
// import i18next from 'i18n'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import Search from 'components/Pages/Search'

const SearchPage = ({ location }) => {
  return (
    <Layout
      location={location}
    >
      <Seo
        data={{}}
        location={location}
      />
      <Search location={location} />
    </Layout>

  )
}

SearchPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default SearchPage
