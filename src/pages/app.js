import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"
import { StateProvider } from 'utils/State'

const App = () => {
  const initialState = {
    user: {},
    basket: {},
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setUser':
        return {
          ...state,
          ...action.newUser
        }
      default:
        return state
    }
  }

  const bReducer = (state, action) => {
    return state
  }

  const mainReducer = ({user, basket}, action) => {
    // middleware goes here, i.e calling analytics service, etc.
    return {
      user: reducer(user, action),
      basket: bReducer(basket, action),
    }
  }

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <Layout>
        <Router>
          <PrivateRoute path="/app/profile" component={<div>Profile</div>} />
          <Login path="/app/login" />
        </Router>
      </Layout>
    </StateProvider>
  )
}

export default App
