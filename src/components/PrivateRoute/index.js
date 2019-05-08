import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { isLoggedIn } from 'utils/auth'
import { getState } from 'utils/State'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const [{user}] = getState()

  if (!isLoggedIn(user) && location.pathname !== `/app/login`) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/app/login`)
    return null
  }

  return (<div> Private Route! {user.legalName}</div>)
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
