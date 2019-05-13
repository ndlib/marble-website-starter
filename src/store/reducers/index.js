import { combineReducers } from 'redux'
import searchReducer from './searchReducer'
import loginReducer from './loginReducer'

export default combineReducers({
  searchReducer,
  loginReducer,
})
