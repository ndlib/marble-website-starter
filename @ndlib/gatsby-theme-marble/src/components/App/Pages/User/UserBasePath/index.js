import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import {
  STATUS_NOT_LOGGED_IN,
  STATUS_TRYING_AUTHENTICATION,
  STATUS_AUTHENTICATED,
  STATUS_AUTHENTICATION_FAILED,
  STATUS_AUTHENTICATED_TRYING_LOGIN,
  STATUS_AUTHENTICATED_NOT_LOGGED_IN,
  STATUS_LOGGED_IN,
} from 'store/actions/loginActions'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import LoginArea from 'components/Shared/LoginArea'
import CreateAccount from 'components/Internal/CreateAccount'
import Loading from 'components/Internal/Loading'
import style from './style.module.css'

// eslint-disable-next-line complexity
const UserBasePath = (props) => {
  const { location, loginReducer } = props

  let content = null
  // eslint-disable-next-line complexity
  switch (loginReducer.status) {
    case STATUS_NOT_LOGGED_IN:
      content = <LoginArea {...props} />
      break
    case STATUS_TRYING_AUTHENTICATION:
      content = <Loading />
      break
    case STATUS_AUTHENTICATION_FAILED:
      content = <div className={style.error}>Authentication Failed.</div>
      break
    case STATUS_AUTHENTICATED:
      content = <Loading />
      break
    case STATUS_AUTHENTICATED_TRYING_LOGIN:
      content = <Loading />
      break
    case STATUS_AUTHENTICATED_NOT_LOGGED_IN:
      content = <CreateAccount loginReducer={loginReducer} />
      break
    case STATUS_LOGGED_IN:
      navigate(`/user/${loginReducer.user.userName}`)
      break
    default:
      content = <div className={style.error}>Login unavilable.</div>
  }

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
      <div className={style.contentBody}>
        {content}
      </div>
    </Layout>
  )
}
UserBasePath.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default UserBasePath
