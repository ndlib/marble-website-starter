import React from 'react'
import PropTypes from 'prop-types'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import Attribution from 'components/Internal/Attribution'
import UserCartouche from 'components/Internal/UserCartouche'
import { ownsPage } from 'utils/auth'
import style from './style.module.css'

const Ownership = ({ portfolio, loginReducer }) => {
  const { visibility, user } = portfolio
  const isOwner = ownsPage(loginReducer, user.userName)
  if (isOwner) {
    return (
      <div className={style.ownership}>You manage this <VisibilityLabel visibility={visibility} /> portfolio.</div>
    )
  }
  return (
    <Attribution>
      Collected and annotated by <UserCartouche user={user} />
    </Attribution>
  )
}

Ownership.propTypes = {
  portfolio: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export default Ownership
