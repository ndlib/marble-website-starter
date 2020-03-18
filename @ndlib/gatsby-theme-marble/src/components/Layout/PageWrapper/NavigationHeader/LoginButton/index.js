/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import typy from 'typy'
import Link from 'components/Internal/Link'
import { jsx } from 'theme-ui'
import userIcon from 'assets/icons/svg/baseline-person-24px-white.svg'
import sx from './sx.js'

export const LoginButton = ({ loginReducer }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            useLogin
          }
        }
      }
    `,
  )
  if (!site.siteMetadata.useLogin) {
    return null
  }
  if (loginReducer.status === 'STATUS_LOGGED_IN') {
    const safeName = getSafeName(loginReducer)
    return (
      <div sx={sx.button}>
        <Link
          to={`/user/${loginReducer.user.userName}`}
          sx={sx.imageLink}
        >
          <img
            src={userIcon}
            alt='My Account'
            title='My Account'
            sx={sx.image}
          />
          <span sx={sx.safeName}>{safeName}</span>
        </Link>
      </div>
    )
  }
  return (
    <div sx={sx.button}>
      <Link
        to={`/user`}
        sx={sx.link}
      >Login</Link>
    </div>
  )
}

LoginButton.propTypes = {
  loginReducer: PropTypes.shape({
    status: PropTypes.string.isRequired,
    user: PropTypes.object,
  }).isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(LoginButton)

export const getSafeName = (loginReducer) => {
  return typy(loginReducer, 'user.fullname').safeString ||
    typy(loginReducer, 'user.userName').safeString ||
    typy(loginReducer, 'user.email').safeString ||
    'My Stuff'
}
