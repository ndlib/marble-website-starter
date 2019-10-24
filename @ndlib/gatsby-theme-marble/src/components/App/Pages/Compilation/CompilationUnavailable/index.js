import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import { isLoggedIn } from 'utils/auth'
import Seo from 'components/Internal/Seo'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import LoginArea from 'components/Shared/LoginArea'
import style from './style.module.css'

export const title = `Compilation Unavailable`
const CompilationUnavailable = (props) => {
  const { location, loginReducer } = props
  const loggedIn = isLoggedIn(loginReducer)

  return (
    <Layout
      location={location}
      title={title}
    >
      <Seo
        data={{}}
        location={location}
        title={title}
        noIndex
      />
      <div className={style.contentArea}>
        <p>This compilation is not available either because it is <VisibilityLabel visibility='private' /> or it does not exist.</p>
        { loggedIn ? null : <LoginArea {...props} /> }
      </div>
    </Layout>
  )
}
CompilationUnavailable.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default CompilationUnavailable
