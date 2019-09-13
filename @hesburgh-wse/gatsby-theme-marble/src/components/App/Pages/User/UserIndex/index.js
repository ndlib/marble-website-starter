import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import UserLayout from '../UserLayout'
import UserTopMenu from '../UserLayout/UserTopMenu'
const UserIndex = (props) => {
  return (
    <UserLayout {...props} >
      <UserTopMenu username={props.username} />
      <ul>
        <li>
          <Link to={`/compilation/compilation-1`}>Compilation 1</Link>
        </li>
        <li>
          <Link to={`/compilation/compilation-2`}>Compilation 2</Link>
        </li>
      </ul>
    </UserLayout>

  )
}
UserIndex.propTypes = {
  username: PropTypes.string,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default UserIndex
