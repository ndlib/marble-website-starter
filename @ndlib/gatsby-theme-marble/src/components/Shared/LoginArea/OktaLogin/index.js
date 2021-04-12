import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { OktaAuth } from '@okta/okta-auth-js'
import MaterialButton from 'components/Shared/MaterialButton'

export const OktaLogin = ({ loginReducer }) => {
  const { t } = useTranslation()
  return (
    <p>
      <MaterialButton
        id='okta'
        onClick={(e) => {
          e.preventDefault()
          const authClient = new OktaAuth(loginReducer.authClientSettings)
          authClient.token.getWithRedirect({
            responseType: 'id_token',
            responseMode: 'fragment',
            scopes: [
              'openid',
              'email',
              'profile',
              'netid',
              'directory',
            ],
          })
        }}
        primary
        wide
      >{t('text:loginPage.button')}
      </MaterialButton>
    </p>
  )
}

OktaLogin.propTypes = {
  loginReducer: PropTypes.object.isRequired,
}
const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps }
}

export default connect(mapStateToProps)(OktaLogin)
