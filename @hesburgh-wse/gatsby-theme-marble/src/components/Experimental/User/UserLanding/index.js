import React from 'react'
import Link from 'components/Internal/Link'

const UserLanding = () => {
  return (
    <React.Fragment>
      <h1>Username's Collections</h1>
      <div>Here will be a list of this user's collections.</div>
      <ul>
        <li><Link to={`/user/username/my-collection-1`}>My Collection 1</Link></li>
        <li><Link to={`/user/username/my-collection-2`}>My Collection 2</Link></li>
      </ul>
    </React.Fragment>

  )
}

export default UserLanding
