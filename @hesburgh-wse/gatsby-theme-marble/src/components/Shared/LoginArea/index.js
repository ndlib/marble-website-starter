import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { handleLogin } from 'store/actions/loginActions'
import { isLoggedIn } from 'utils/auth'

export const LoginArea = ({ dispatch, loginReducer }) => {
  const message = (isLoggedIn(loginReducer)) ? (<p>Hi {loginReducer.user.fullname}</p>) : ''

  return (
    <div>
      { message }
      <form
        method='post'
        onSubmit={event => {
          event.preventDefault()
          dispatch(handleLogin())
          navigate(`/user`)
        }}
      >
        <p>
          For this demo, please log in with the username <code>gatsby</code> and the
          password <code>demo</code>.
        </p>
        <p>
          <input type='submit' value='Login with Notre Dame Campus Authentication' />
        </p>
        <p>
          <button alt='Google' id='google'>Login with Google</button>
        </p>
        <p>
          <button alt='Facebook' id='facebook'>Login with Facebook</button>
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
