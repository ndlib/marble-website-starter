import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { handleLogin } from 'store/actions/loginActions'
import { isLoggedIn } from 'utils/auth'
import MaterialButton from 'components/Internal/MaterialButton'
import style from './style.module.css'

export const LoginArea = ({ dispatch, loginReducer }) => {
  const message = (isLoggedIn(loginReducer)) ? (<p>Hi {loginReducer.user.fullname}</p>) : ''

  return (
    <div>
      { message }
      <form className={style.loginArea}>
        <p>
          For this demo, please log in with the username <code>gatsby</code> and the
          password <code>demo</code>.
        </p>
        <p>
          <MaterialButton
            id='okta'
            onClick={(e) => {
              e.preventDefault()
              dispatch(handleLogin())
              navigate(`/user`)
            }}
            primary
            wide
          >Login with Notre Dame Campus Authentication</MaterialButton>
        </p>
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
  dispatch: PropTypes.func,
}

const mapStateToProps = (state) => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginArea)
