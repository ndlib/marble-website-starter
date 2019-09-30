import React from 'react'
import PropTypes from 'prop-types'
import AppRouter from 'components/App/AppRouter'

export const App = ({ location }) => <AppRouter location={location} />

App.propTypes = {
  location: PropTypes.object.isRequired,
}

export default App
