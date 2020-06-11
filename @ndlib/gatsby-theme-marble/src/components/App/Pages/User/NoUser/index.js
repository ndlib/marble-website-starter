/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { Trans } from 'react-i18next'

const NoUser = ({ userName }) => {
  const sx = {
    border: '1px solid',
    borderColor: 'gray.1',
    color: 'gray.4',
    margin: '1rem',
    padding: '.5rem',
    textAlign: 'center',
    width: 'calc(100% - 2rem)',
  }

  return (
    <div sx={sx}>
      <p>
        <Trans i18nKey='text:noUserPage'>
          The user <code>{{ userName }}</code> does not exist.
        </Trans>
      </p>
    </div>
  )
}
NoUser.propTypes = {
  userName: PropTypes.string.isRequired,
}
export default NoUser
