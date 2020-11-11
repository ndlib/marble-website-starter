import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'

const Learn = ({ location }) => {
  return (
    <Layout
      title='Learn'
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title='Learn'
      />
      <I18nextProvider i18n={i18next}>
        <div>
          <div>
            Coming in the beta release! On this page you will be able to:
          </div>
          <ul>
            <li>Read about how instructors are using unique collections in their classrooms</li>
            <li>See example digital projects using materials from this site</li>
            <li>ind links to digital pedagogy resources from universities around the globe</li>
          </ul>
        </div>
      </I18nextProvider>
    </Layout>

  )
}

Learn.propTypes = {
  location: PropTypes.object.isRequired,
}
export default Learn
