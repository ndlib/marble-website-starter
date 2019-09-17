import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { isLoggedIn } from 'utils/auth'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import LoginArea from 'components/Shared/LoginArea'
import style from './style.module.css'

const LoginOrRedirect = (props) => {
  const { location, loginReducer } = props
  if (isLoggedIn(loginReducer)) {
    navigate(`/user/${loginReducer.user.username}`)
    return null
  }
  // TODO put login page here instead of redirect
  return (
    <Layout
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title={`Login`}
        noIndex
      />
      <div className={style.loginArea}>
        <LoginArea {...props} />
      </div>
    </Layout>
  )
}
LoginOrRedirect.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}
export default LoginOrRedirect
