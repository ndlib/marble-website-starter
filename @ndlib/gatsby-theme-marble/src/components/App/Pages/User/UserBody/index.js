import React from 'react'
import PropTypes from 'prop-types'
import CompilationList from './CompilationList'
import UserEdit from './UserEdit'

const UserBody = ({ user, edit = false }) => {
  return edit ? <UserEdit user={user} /> : <CompilationList user={user} />
}

UserBody.propTypes = {
  user: PropTypes.object.isRequired,
  edit: PropTypes.bool,
}

export default UserBody
