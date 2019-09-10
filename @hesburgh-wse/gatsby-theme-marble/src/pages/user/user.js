import React from 'react'
import PropTypes from 'prop-types'
import User from 'components/Experimental/User'
export const UserPage = ({ location }) => {
  return (
    <User location={location} />
  )
}

UserPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default UserPage
