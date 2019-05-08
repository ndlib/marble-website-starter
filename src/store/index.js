// This is imported in gatsby-ssr and gatsby-browser as wrapRootElement to provide a connection to the store.
import React from 'react'
import { StateProvider } from 'utils/State'


export default ({ element }) => {
  const initialState = {
    user: {},
    basket: {},
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setUser':
        return {
          ...state,
          ...action.newUser,
        }
      default:
        return state
    }
  }

  const bReducer = (state, action) => {
    return state
  }

  const mainReducer = ({ user, basket }, action) => {
    // middleware goes here, i.e calling analytics service, etc.
    return {
      user: reducer(user, action),
      basket: bReducer(basket, action),
    }
  }

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      {element}
    </StateProvider>
  )
}
