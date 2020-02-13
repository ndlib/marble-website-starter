import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import Layout from 'components/Layout'
import UserBasePath from 'components/App/Pages/User/UserBasePath'
import User from 'components/App/Pages/User'
import Compilation from 'components/App/Pages/Compilation'

export const AppRouter = (props) => {
  return (
    <Layout location={props.location}>
      <Router>
        <UserBasePath path='/user' {...props} />
        <User path='/user/:userName' {...props} />
        <User path='/user/:userName/edit' edit {...props} />
        <Compilation path='/compilation/:compilationId' {...props} />
        <Compilation path='/compilation/:compilationId/edit' edit {...props} />
      </Router>
    </Layout>
  )
}

AppRouter.propTypes = {
  location: PropTypes.object.isRequired,
}

export default AppRouter
