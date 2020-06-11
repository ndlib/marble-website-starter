/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import { Trans } from 'react-i18next'
import { BaseStyles, jsx } from 'theme-ui'

export const PromptLogin = ({ showButton }) => {
  if (!showButton) {
    return null
  }
  return (
    <BaseStyles>
      <div
        sx={{
          border: '1px solid',
          borderColor: 'gray.1',
          padding: '.5rem',
        }}
      >
        <p>
          <Trans i18nKey='text:userPage.loginPrompt'>
            <Link to={`/user`}>Log in</Link>.
          </Trans>
        </p>
      </div>
    </BaseStyles>
  )
}

PromptLogin.propTypes = {
  showButton: PropTypes.bool.isRequired,

}
export default PromptLogin
