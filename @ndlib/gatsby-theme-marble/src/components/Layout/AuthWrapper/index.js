import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import typy from 'typy'
import {
  putAuthSettingsInStore,
  getTokenAndPutInStore,
} from 'store/actions/loginActions'

export const AuthWrapper = ({ children, location, loginReducer, dispatch }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            useLogin
            authClient {
              url
              clientId
              issuer
            }
            userContentPath
          }
        }
      }
    `,
  )
  if (typy(site, 'siteMetadata.useLogin').safeBoolean &&
  typy(site, 'siteMetadata.authClient').safeObject) {
    if (!loginReducer.authClientSettings) {
      dispatch(putAuthSettingsInStore(site, location))
    } else {
      dispatch(getTokenAndPutInStore(loginReducer, location))
    }
  }
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

AuthWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  loginReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthWrapper)
