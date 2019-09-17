import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Router } from '@reach/router'
import LoginOrRedirect from 'components/App/Pages/User/LoginOrRedirect'
import UserIndex from 'components/App/Pages/User/UserIndex'
import UserEdit from 'components/App/Pages/User/UserEdit'
import UserFollowing from 'components/App/Pages/User/UserFollowing'
import Compilation from 'components/App/Pages/Compliation'

export const AppRouter = (props) => {
  return (
    <Router>
      <LoginOrRedirect path='/user' {...props} />
      <UserIndex path='/user/:username' {...props} />
      <UserEdit path='/user/:username/edit' {...props} />
      <UserFollowing path='/user/:username/following' {...props} />
      <Compilation path='/compilation/:compilationId' {...props} />
    </Router>
  )
}

AppRouter.propTypes = {
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
)(AppRouter)
