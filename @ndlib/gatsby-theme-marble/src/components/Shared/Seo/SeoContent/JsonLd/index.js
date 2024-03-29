import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

export function JsonLd ({ children }) {
  return (
    <Helmet htmlAttributes={{
      lang: 'en',
    }}>
      <script type='application/ld+json'>{JSON.stringify(children)}</script>
    </Helmet>
  )
}

JsonLd.propTypes = {
  children: PropTypes.any,
}
