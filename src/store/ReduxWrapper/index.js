// This is imported in gatsby-ssr and gatsby-browser as wrapRootElement to provide a connection to the store.

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'
const store = configureStore()

export default ({ element }) => {
  return (
    <Provider store={store}>{element}</Provider>
  )
}
