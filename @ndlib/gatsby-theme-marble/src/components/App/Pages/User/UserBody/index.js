import React from 'react'
import PropTypes from 'prop-types'
import PortfolioList from './PortfolioList'
import UserEdit from './UserEdit'

const UserBody = ({ user, edit = false }) => {
  return edit ? <UserEdit user={user} /> : <PortfolioList user={user} />
}

UserBody.propTypes = {
  user: PropTypes.object.isRequired,
  edit: PropTypes.bool,
}

export default UserBody
