import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'
import Login from '../components/Login'
import PrivateRoute from '../components/PrivateRoute'

const App = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute path='/app/profile' component={<div>Profile</div>} />
        <Login path='/app/login' />
      </Router>
    </Layout>
  )
}

export default App
