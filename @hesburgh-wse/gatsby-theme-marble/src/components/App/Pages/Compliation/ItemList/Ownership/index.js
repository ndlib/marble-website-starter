import React from 'react'
import PropTypes from 'prop-types'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import Attribution from 'components/Internal/Attribution'
import UserCartouche from 'components/Internal/UserCartouche'
import { ownsPage } from 'utils/auth'
import style from './style.module.css'

const Ownership = ({ compilation, loginReducer }) => {
  const { visibility, user } = compilation
  const isOwner = ownsPage(loginReducer, user.username)
  if (isOwner) {
    return (
      <div className={style.ownership}>You manage this <VisibilityLabel visibility={visibility} /> compilation.</div>
    )
  }
  return (
    <Attribution>
      Collected and annotated by <UserCartouche user={user} />
    </Attribution>
  )
}

Ownership.propTypes = {
  compilation: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export default Ownership
