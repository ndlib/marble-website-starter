import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import UserLayout from '../UserLayout'
import UserTopMenu from '../UserLayout/UserTopMenu'

const UserFollowing = (props) => {
  return (
    <UserLayout {...props}>
      <UserTopMenu username={props.username} />
      <ul>
        <li>
          <Link to={`/user/dwolfe2`}>Dan Wolfe</Link>
        </li>
        <li>
          <Link to={`/user/jhartzle`}>Jon Hartzler</Link>
        </li>
      </ul>
    </UserLayout>
  )
}
UserFollowing.propTypes = {
  username: PropTypes.string,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default UserFollowing
