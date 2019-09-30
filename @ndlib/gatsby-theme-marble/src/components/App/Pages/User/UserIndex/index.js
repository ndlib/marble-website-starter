import React from 'react'
import PropTypes from 'prop-types'
import UserLayout from '../UserLayout'
import UserTopMenu from '../UserLayout/UserTopMenu'
import CompilationList from './CompilationList'
import { isLoggedIn, ownsPage } from 'utils/auth'
import { getUserCompilations, getUser } from 'utils/appUtils'
import NoUser from '../NoUser'

const UserIndex = (props) => {
  const { loginReducer, username } = props
  const user = getUser(username)
  if (!user) {
    return (<NoUser {...props} />)
  }
  const loggedIn = isLoggedIn(loginReducer)
  const isOwner = ownsPage(loginReducer, username)
  const compilations = getUserCompilations(username)
  return (
    <UserLayout user={user} {...props} >
      <UserTopMenu username={props.username} />
      <CompilationList
        isOwner={isOwner}
        loggedIn={loggedIn}
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
