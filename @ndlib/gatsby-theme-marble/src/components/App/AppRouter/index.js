import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Router } from '@reach/router'
import UserBasePath from 'components/App/Pages/User/UserBasePath'
import UserIndex from 'components/App/Pages/User/UserIndex'
import UserEdit from 'components/App/Pages/User/UserEdit'
import UserFollowing from 'components/App/Pages/User/UserFollowing'
import Compilation from 'components/App/Pages/Compilation'

export const AppRouter = (props) => {
  return (
    <Router>
      <UserBasePath
        path='/user'
        {...props}
      />
      <UserIndex
        path='/user/:userName'
        {...props}
      />
      <UserEdit
        path='/user/:userName/edit'
        {...props}
      />
      <UserFollowing
        path='/user/:userName/following'
        {...props}
      />
      <Compilation
        path='/compilation/:compilationId'
        {...props}
      />
      <Compilation
        path='/compilation/:compilationId/edit'
        edit
        {...props}
      />
    </Router>
  )
}

AppRouter.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(AppRouter)
