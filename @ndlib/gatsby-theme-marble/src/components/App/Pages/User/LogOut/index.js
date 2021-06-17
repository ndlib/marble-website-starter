/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import  OktaAuth  from '@okta/okta-auth-js'
import Loading from 'components/Shared/Loading'
import { logUserOut } from 'store/actions/loginActions'
import { jsx } from 'theme-ui'

export const LogOut = ({ dispatch, loginReducer }) => {
  const { t } = useTranslation()
  useEffect(() => {
    if (loginReducer.user.userName) {
      const authClient = new OktaAuth(loginReducer.authClientSettings)
      dispatch(logUserOut(authClient))
    }
  })

  const sx = {
    border: '1px solid',
    borderColor: 'gray.4',
    color: 'gray.4',
    margin: '1rem',
    padding: '.5rem',
    textAlign: 'center',
    width: 'calc(100% - 2rem)',
  }

  // render Loading if the dispatch is taking too long
  if (loginReducer.user.userName) {
    return <Loading />
  }

  return (
    <div sx={sx}>
      <p>{t('text:userLogoutPage')}</p>
    </div>
  )
}

LogOut.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogOut)
