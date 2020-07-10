import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { isLoggedIn } from 'utils/auth'
import OktaLogin from './OktaLogin'
import LogOut from './LogOut'
import style from './style.module.css'

export const LoginArea = ({ loginReducer }) => {
  const { t } = useTranslation()
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
        <div className={style.message}>
          {t('text:loginPage.message')}
        </div>
        <OktaLogin />
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
