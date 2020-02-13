import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import {
  STATUS_NOT_LOGGED_IN,
  STATUS_TRYING_AUTHENTICATION,
  STATUS_AUTHENTICATION_FAILED,
  STATUS_AUTHENTICATED_TRYING_LOGIN,
  STATUS_AUTHENTICATED_NOT_LOGGED_IN,
  STATUS_LOGGED_IN,
} from 'store/actions/loginActions'
import LoginArea from 'components/Shared/LoginArea'
import CreateAccount from './CreateAccount'

import Loading from 'components/Internal/Loading'
import style from '../style.module.css'

// eslint-disable-next-line complexity
const UserBasePathContent = ({ loginReducer }) => {
  switch (loginReducer.status) {
    case STATUS_NOT_LOGGED_IN:
      return <LoginArea loginReducer={loginReducer} />
    case STATUS_TRYING_AUTHENTICATION:
    case STATUS_AUTHENTICATED_TRYING_LOGIN:
      return <Loading />
    case STATUS_AUTHENTICATED_NOT_LOGGED_IN:
      return <CreateAccount loginReducer={loginReducer} />
    case STATUS_LOGGED_IN:
      navigate(`/user/${loginReducer.user.userName}`)
      break
    case STATUS_AUTHENTICATION_FAILED:
    default:
      return <div className={style.error}>An error has occured.</div>
  }
  return null
}
UserBasePathContent.propTypes = {
  loginReducer: PropTypes.object.isRequired,
}
const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps }
}
export default connect(
  mapStateToProps,
)(UserBasePathContent)
