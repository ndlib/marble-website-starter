import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import Link from 'components/Shared/Link'
import style from './style.module.css'
import userIcon from 'assets/icons/svg/baseline-person-24px-white.svg'

export const LoginButton = ({ loginReducer }) => {
  if (loginReducer.status === 'STATUS_LOGGED_IN') {
    const safeName = getSafeName(loginReducer)
    return (
      <div className={style.loginButton}>
        <Link to='/login'>
          <img
            src={userIcon}
            alt='My Account'
            title='My Account'
          />
          <span>{safeName}</span>
        </Link>
      </div>
    )
  }
  return (
    <div className={style.loginButton}>
      <Link to='/login'>Login</Link>
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
