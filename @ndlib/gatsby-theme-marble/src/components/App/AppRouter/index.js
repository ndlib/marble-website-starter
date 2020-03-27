import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import Layout from 'components/Layout'
import UserBasePath from 'components/App/Pages/User/UserBasePath'
import User from 'components/App/Pages/User'
import LogOut from 'components/App/Pages/User/LogOut'
import Portfolio from 'components/App/Pages/Portfolio'

export const AppRouter = (props) => {
  return (
    <Layout location={props.location}>
      <Router>
        <UserBasePath path='/user' {...props} />
        <LogOut path='/user/logout' {...props} />
        <User path='/user/:userName' {...props} />
        <User path='/user/:userName/edit' edit {...props} />
        <Portfolio path='/myportfolio/:portfolioId' {...props} />
        <Portfolio path='/myportfolio/:portfolioId/edit' edit {...props} />
      </Router>
    </Layout>
  )
}

AppRouter.propTypes = {
  location: PropTypes.object.isRequired,
}

export default AppRouter
