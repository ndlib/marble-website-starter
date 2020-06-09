/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import typy from 'typy'
import Link from 'components/Internal/Link'
import { jsx } from 'theme-ui'
import userIcon from 'assets/icons/svg/baseline-person-24px-white.svg'
import sx from './sx.js'

export const LoginButton = ({ location, loginReducer }) => {
  const { t } = useTranslation()
  const [isOpen, setOpen] = useState(false)
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            useLogin
          }
        }
      }
    `,
  )
  if (!site.siteMetadata.useLogin) {
    return null
  }
  if (loginReducer.status === 'STATUS_LOGGED_IN') {
    return (
      <div>
        <button
          sx={sx.button}
          onClick={() => {
            setOpen(!isOpen)
          }}
          onBlur={(e) => {
            closeOnBlur(e, setOpen, location)
          }}
        >
          <img
            src={userIcon}
            alt='My Profile'
            title='My Profile'
            sx={sx.image}
          />
        </button>
        <div sx={isOpen ? sx.submenu : sx.hiddenMenu}>
          <Link
            to={`/user/${loginReducer.user.userName}`}
            sx={sx.submenuItem}
          >{ t('common:loginMenu.userPage') }</Link>
          <Link
            to={`/user/${loginReducer.user.userName}/edit`}
            sx={sx.submenuItem}
          >{ t('common:loginMenu.userEdit') }</Link>
          <Link
            to={`/user/logout`}
            sx={sx.submenuItem}
          >{ t('common:loginMenu.logout') }</Link>
        </div>
      </div>
    )
  }
  return (
    <div sx={sx.button}>
      <Link
        to={`/user`}
        sx={sx.link}
      >{ t('common:loginMenu.login') }</Link>
    </div>
  )
}

LoginButton.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.shape({
    status: PropTypes.string.isRequired,
    user: PropTypes.object,
  }).isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(LoginButton)

export const closeOnBlur = (e, setOpen, location) => {
  const linkTarget = typy(e, 'relatedTarget.href').safeString
  // Close if:
  //   No related target - clicking browser's native UI
  //   Clicking a something that is not a link
  //   Clicking a link to the current page - a normal link triggers a re-render resetting the default state. Clicking a link to the current page need to be closed manually
  if (!e.relatedTarget || !linkTarget || linkTarget === location.href) {
    setOpen(false)
  }
}
