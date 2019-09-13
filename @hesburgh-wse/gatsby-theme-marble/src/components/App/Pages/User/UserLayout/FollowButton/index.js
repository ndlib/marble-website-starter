/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import MaterialButton from 'components/Internal/MaterialButton'
import { jsx } from 'theme-ui'

const FollowButton = ({ username, showButton }) => {
  if (!showButton) {
    return (
      <div
        sx={{
          border: '1px solid',
          borderColor: 'gray.1',
          padding: '.5rem',
        }}
      >
        <p><Link to={`/login`}>Log in</Link> to follow users or access your edit your own content.</p>
      </div>
    )
  }
  return (
    <MaterialButton
      onClick={() => console.log(`follow ${username}`)}
      wide
    >Follow</MaterialButton>
  )
}

FollowButton.propTypes = {
  showButton: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
}
export default FollowButton
