import React from 'react'
import PropTypes from 'prop-types'
import UserLayout from '../UserLayout'
import UserTopMenu from '../UserLayout/UserTopMenu'
import CompilationList from './CompilationList'
import { isLoggedIn, ownsPage } from 'utils/auth'
import { getUserCompilations, getUser } from 'utils/appUtils'
import NoUser from '../NoUser'

const UserIndex = (props) => {
  const { loginReducer, userName } = props
  const user = getUser(userName)
  if (!user) {
    return (<NoUser {...props} />)
  }
  const loggedIn = isLoggedIn(loginReducer)
  const isOwner = ownsPage(loginReducer, userName)
  const compilations = getUserCompilations(userName)
  return (
    <UserLayout user={user} {...props} >
      <UserTopMenu userName={props.userName} location={props.location} />
      <CompilationList
        isOwner={isOwner}
        loggedIn={loggedIn}
        compilations={compilations}
      />
    </UserLayout>

  )
}
UserIndex.propTypes = {
  userName: PropTypes.string,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default UserIndex
