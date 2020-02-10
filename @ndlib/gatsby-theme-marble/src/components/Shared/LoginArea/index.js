import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  isLoggedIn,
} from 'utils/auth'
import OktaLogin from './OktaLogin'

import LogOut from './LogOut'
import MaterialButton from 'components/Internal/MaterialButton'
import style from './style.module.css'

export const LoginArea = ({ loginReducer }) => {
  if (isLoggedIn(loginReducer)) {
    return (
      <div>
        <form className={style.loginArea}>
          <LogOut />
        </form>
      </div>
    )
  }

  return (
    <div>
      <form className={style.loginArea}>
        <OktaLogin />
        <p>
          <MaterialButton
            disabled
            id='google'
            onClick={() => console.log('Login With Google')}
            wide
          >Login with Google</MaterialButton>
        </p>
        <p>
          <MaterialButton
            disabled
            id='facebook'
            onClick={() => console.log('Login With Facebook')}
            wide
          >Login with Facebook</MaterialButton>
        </p>
      </form>
    </div>
  )
}

LoginArea.propTypes = {
  loginReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(LoginArea)
