import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import MaterialButton from 'components/Internal/MaterialButton'

const FollowButton = ({ username, showButton }) => {
  if (!showButton) {
    return (
      <div><Link to={`/login`}>Log in</Link> to follow users or access your edit your own content.</div>
    )
  }
  return (
    <MaterialButton
      label='Follow'
      onClick={() => console.log(`follow ${username}`)}
      wide
    />
  )
}

FollowButton.propTypes = {
  showButton: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
}
export default FollowButton
