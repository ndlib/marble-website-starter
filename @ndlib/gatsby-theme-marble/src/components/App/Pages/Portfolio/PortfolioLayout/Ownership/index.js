import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import Attribution from 'components/Internal/Attribution'
import UserCartouche from 'components/Internal/UserCartouche'
import { ownsPage } from 'utils/auth'
import style from './style.module.css'

export const Ownership = ({ portfolio, loginReducer }) => {
  const { privacy, userId } = portfolio
  const isOwner = ownsPage(loginReducer, userId)
  if (isOwner) {
    return (
      <div className={style.ownership}>This is your <VisibilityLabel visibility={privacy} /> portfolio.</div>
    )
  }
  return (
    <Attribution>
      Portfolio collected and annotated by <UserCartouche user={{ uuid: userId }} />
    </Attribution>
  )
}

Ownership.propTypes = {
  portfolio: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(Ownership)
