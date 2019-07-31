import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Layout from 'components/Layout'
import SEO from 'components/Internal/Seo'
import { connect } from 'react-redux'
import { handleLogin } from 'store/actions/loginActions'
import { isLoggedIn } from 'utils/auth'

export const Login = ({ dispatch, location, loginReducer }) => {
  const message = (isLoggedIn(loginReducer)) ? (<p>Hi {loginReducer.user.fullname}</p>) : ''

  return (
    <Layout
      title='Login'
      preMain={<SEO title='Login' />}
      location={location}
    >
      {message}
      <form
        method='post'
        onSubmit={event => {
          event.preventDefault()
          dispatch(handleLogin())
          navigate(`/`)
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
    </Layout>
  )
}

Login.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  location: PropTypes.object.isRequired,
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
)(Login)
