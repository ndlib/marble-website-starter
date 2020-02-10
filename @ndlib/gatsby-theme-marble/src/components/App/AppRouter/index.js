import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Router } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import UserBasePath from 'components/App/Pages/User/UserBasePath'
import UserIndex from 'components/App/Pages/User/UserIndex'
import UserEdit from 'components/App/Pages/User/UserEdit'
import UserFollowing from 'components/App/Pages/User/UserFollowing'
import Compilation from 'components/App/Pages/Compilation'

export const AppRouter = (props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            userContentPath
          }
        }

      }
    `,
  )
  const userContentPath = typy(site, 'siteMetadata.userContentPath').safeString
  return (
    <Router>
      <UserBasePath
        path='/user'
        userContentPath={userContentPath}
        {...props}
      />
      <UserIndex
        path='/user/:userName'
        userContentPath={userContentPath}
        {...props}
      />
      <UserEdit
        path='/user/:userName/edit'
        userContentPath={userContentPath}
        {...props}
      />
      <UserFollowing
        path='/user/:userName/following'
        userContentPath={userContentPath}
        {...props}
      />
      <Compilation
        path='/compilation/:compilationId'
        userContentPath={userContentPath}
        {...props}
      />
      <Compilation
        path='/compilation/:compilationId/edit'
        userContentPath={userContentPath}
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
export const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppRouter)
