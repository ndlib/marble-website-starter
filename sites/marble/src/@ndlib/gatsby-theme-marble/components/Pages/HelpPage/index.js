import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import HelpContent from './HelpContent'

const HelpPage = ({ location }) => {
  return (

    <I18nextProvider i18n={i18next}>
      <HelpContent
        location={location}
      />
    </I18nextProvider>

  )
}

HelpPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default HelpPage
