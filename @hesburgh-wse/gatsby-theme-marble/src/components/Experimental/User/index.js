import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { Router } from '@reach/router'
import { isLoggedIn } from 'utils/auth'
import Layout from 'components/Layout'
import UserLanding from './UserLanding'
import UserCollection from './UserCollection'
export const User = ({ location, loginReducer }) => {
  if (location.pathname === `/user`) {
    if (isLoggedIn(loginReducer)) {
      navigate(`/user/${loginReducer.user.username}`)
      return null
    } else {
      navigate(`/login`)
      return null
    }
  }
  return (
    <Layout
      location={location}
    >
      <Router>
        <UserLanding path='/user/:username' />
        <UserCollection path='/user/:username/:collectionId' />
      </Router>
    </Layout>
  )
}

User.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
