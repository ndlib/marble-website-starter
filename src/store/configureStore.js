// configure store
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

let devToolExtension = null
if (typeof window !== `undefined`) {
  devToolExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
}
// required to use the redux dev tools
const composeEnhancers = devToolExtension || compose

export default function configureStore () {
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware
      )
    )
  )
}
