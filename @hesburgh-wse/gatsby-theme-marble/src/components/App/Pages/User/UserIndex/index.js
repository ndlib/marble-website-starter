import React from 'react'
import PropTypes from 'prop-types'
import UserLayout from '../UserLayout'
import UserTopMenu from '../UserLayout/UserTopMenu'
import CompilationList from './CompilationList'
import { ownsPage } from 'utils/auth'

const UserIndex = (props) => {
  const { loginReducer, username } = props
  const isOwner = ownsPage(loginReducer, username)
  const compilations = [
    {
      label: 'Compilation 1',
      target: '/compilation/thing-1',
    },
    {
      label: 'Compilation 2',
      target: '/compilation/thing-2',
    },
    {
      label: 'Compilation 3',
      target: '/compilation/thing-3',
    },
  ]
  return (
    <UserLayout {...props} >
      <UserTopMenu username={props.username} />
      <CompilationList
        isOwner={isOwner}
        compilations={compilations}
      />
    </UserLayout>

  )
}
UserIndex.propTypes = {
  username: PropTypes.string,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default UserIndex
