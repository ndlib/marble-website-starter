/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import MaterialButton from 'components/Internal/MaterialButton'
import { jsx } from 'theme-ui'

export const FollowButton = ({ userName, showButton, following = false }) => {
  if (!showButton) {
    return (
      <div
        sx={{
          border: '1px solid',
          borderColor: 'gray.1',
          padding: '.5rem',
        }}
      >
        <p><Link to={`/user`}>Log in</Link> to follow users or access and edit your own content.</p>
      </div>
    )
  } else if (following) {
    return (
      <MaterialButton
        onClick={() => unfollowAction(userName)}
        wide
      >Unfollow</MaterialButton>
    )
  }
  return (
    <MaterialButton
      onClick={() => followAction(userName)}
      wide
    >Follow</MaterialButton>
  )
}

FollowButton.propTypes = {
  showButton: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  following: PropTypes.bool,
}
export default FollowButton

export const followAction = (userName) => {
  console.log(`follow ${userName}`)
}

export const unfollowAction = (userName) => {
  console.log(`unfollow ${userName}`)
}
