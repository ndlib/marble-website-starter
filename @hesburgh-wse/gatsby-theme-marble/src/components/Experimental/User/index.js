import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Router } from '@reach/router'
import LoginOrRedirect from './LoginOrRedirect'
import UserIndex from './UserIndex'
import UserEdit from './UserEdit'
import UserFollowing from './UserFollowing'
import UserCompilation from './UserCompilation'

export const User = (props) => {
  return (
    <Router>
      <LoginOrRedirect path='/user' {...props} />
      <UserIndex path='/user/:username' {...props} />
      <UserEdit path='/user/:username/edit' {...props} />
      <UserFollowing path='/user/:username/following' {...props} />
      <UserCompilation path='/user/:username/:compilationId' {...props} />
    </Router>
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
