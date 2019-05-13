import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { isLoggedIn } from 'utils/auth'
import { getState } from 'utils/state'

const PrivateRoute = ({ children, location, testLogin }) => {
  const [{user}] = getState()

  if (testLogin && !isLoggedIn(user) && location.pathname !== `/login`) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/login`)
    return null
  }

  return (
    <div>
      {children}
    </div>
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  testLogin: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  testLogin: false,
}

export default PrivateRoute
