/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import typy from 'typy'
import MaterialButton from 'components/Internal/MaterialButton'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import Attribution from 'components/Internal/Attribution'
import UserCartouche from 'components/Internal/UserCartouche'
import { ownsPage } from 'utils/auth'
import { jsx } from 'theme-ui'

export const Ownership = ({ portfolio, loginReducer, location }) => {
  const { privacy, userId } = portfolio
  const isOwner = ownsPage(loginReducer, userId)
  if (isOwner) {
    return (
      <div sx={{
        width: '100%',
      }}>
        <div
          sx={{
            display: 'inline-block',
          }}
        >This is your <VisibilityLabel visibility={privacy} /> portfolio.</div> {
          typy(location, 'pathname').safeString.includes('edit') ? null : (
            <div sx={{
              display: 'inline-block',
              float: 'right',
              verticalAlign: 'top',
            }}>
              <MaterialButton
                primary
                wide
                onClick={() => navigate(`/myportfolio/${portfolio.uuid}/edit`)}
              >Edit</MaterialButton>
            </div>
          )
        }
      </div>
    )
  }
  return (
    <Attribution>
      Portfolio collected and annotated by <UserCartouche user={{ uuid: userId }} />
    </Attribution>
  )
}

Ownership.propTypes = {
  location: PropTypes.object,
  portfolio: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(Ownership)
