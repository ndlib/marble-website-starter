import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import typy from 'typy'
import Link from 'components/Internal/Link'
import style from './style.module.css'
import userIcon from 'assets/icons/svg/baseline-person-24px-white.svg'

export const LoginButton = ({ loginReducer }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            loginPath
          }
        }
      }
    `
  )
  if (!site.siteMetadata.loginPath) {
    return null
  }
  let buttonInards = 'Login'
  if (loginReducer.status === 'STATUS_LOGGED_IN') {
    const safeName = getSafeName(loginReducer)
    buttonInards = (
      <React.Fragment>
        <img
          src={userIcon}
          alt='My Account'
          title='My Account'
        />
        <span>{safeName}</span>
      </React.Fragment>
    )
  }
  return (
    <div className={style.loginButton}>
      <Link to={`/${site.siteMetadata.loginPath}`}>{buttonInards}</Link>
    </div>
  )
}

LoginButton.propTypes = {
  loginReducer: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(LoginButton)

export const getSafeName = (loginReducer) => {
  return typy(loginReducer, 'user.fullname').safeString ||
    typy(loginReducer, 'user.username').safeString ||
    typy(loginReducer, 'user.email').safeString ||
    'My Stuff'
}
