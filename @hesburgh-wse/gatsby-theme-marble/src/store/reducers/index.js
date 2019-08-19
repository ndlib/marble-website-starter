import { combineReducers } from 'redux'
import displayReducer from './displayReducer'
import loginReducer from './loginReducer'
import searchReducer from './searchReducer'

export default combineReducers({
  displayReducer,
  loginReducer,
  searchReducer,
})
