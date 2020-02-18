/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import { jsx } from 'theme-ui'

export const PromptLogin = ({ showButton }) => {
  if (!showButton) {
    return null
  }
  return (
    <div
      sx={{
        border: '1px solid',
        borderColor: 'gray.1',
        padding: '.5rem',
      }}
    >
      <p><Link to={`/user`}>Log in</Link> to access and edit your own content.</p>
    </div>
  )
}

PromptLogin.propTypes = {
  showButton: PropTypes.bool.isRequired,

}
export default PromptLogin
